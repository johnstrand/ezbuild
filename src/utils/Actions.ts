import { action, pending } from "./Store";

import { OrgSettings, patStore } from "./PatStore";
import { showToast } from "./AppToaster";
import { Project } from "./ApiTypes";
import { getTenants, getAccount } from "./Auth";

export const listTenants = action(async _ => {
    pending("tenants", true);
    const tenants = await getTenants();
    if (tenants.length > 0) {
        listOrganizations(tenants[0].tenantId);
    }
    pending("tenants", false);
    return { tenants, account: getAccount() };
});

export const listOrganizations = action<string>(async (state, tenantId) => {
    const profile = await state.profileService.get(tenantId);
    await state.accountService.listAccounts(tenantId, profile.id);
    return {};
});

export const resetValidation = action(_ => {
    return { validToken: false };
});

export const tryAddOrganization = action<OrgSettings>(
    async (
        { orgs, projects, selectedProject, selectedOrg, projectService },
        settings
    ) => {
        pending("validToken", true);
        const org = { ...settings };
        const first = patStore.empty();
        org.pat = patStore.encode(org.pat);
        let validToken = true;
        let p: Project[];
        try {
            p = await projectService.list(org);
            showToast("Personal Access Token saved", "success");
            orgs = patStore.add(org);
        } catch {
            showToast("Invalid configuration", "danger", "warning-sign");
            p = [];
            return { validToken: false };
        } finally {
            pending("validToken", false);
        }
        return {
            validToken,
            orgs,
            selectedOrg: first ? org : selectedOrg,
            projects: first ? p : projects,
            selectedProject: first ? p[0].name : selectedProject
        };
    }
);

export const deleteOrganization = action<string>((state, name) => {
    const selected = state.selectedOrg && state.selectedOrg.name === name;
    const orgs = patStore.remove(name);

    if (selected && patStore.empty()) {
        return {
            orgs,
            selectedOrg: null,
            projects: [],
            selectedProject: null,
            buildDefinitions: []
        };
    } else {
        if (selected && !patStore.empty()) {
            const selectedOrg = patStore.first()!;
            listProjects(selectedOrg);
        }
        return {
            orgs
        };
    }
});

export const listProjects = action<OrgSettings>(
    async ({ projectService }, settings) => {
        pending("projects", true);
        try {
            const projects = await projectService.list(settings);
            if (projects.length) {
                listBuildDefinitions({ settings, project: projects[0].name });
                listReleaseDefinitions({ settings, project: projects[0].name });
            }
            return {
                selectedOrg: settings,
                projects,
                selectedProject: projects[0].name
            };
        } catch {
            showToast(
                `Personal Access Token for ${settings.alias} is invalid`,
                "danger",
                "warning-sign"
            );
        } finally {
            pending("projects", false);
        }
        return {};
    }
);

export const listReleaseDefinitions = action<{
    settings: OrgSettings;
    project: string;
}>(async ({ releaseService }, { settings, project }) => {
    await releaseService.listDefinitions(settings, project);
    return {};
});

export const listBuildDefinitions = action<{
    settings: OrgSettings;
    project: string;
}>(async ({ buildService }, { settings, project }) => {
    pending("buildDefinitions", true);
    const buildDefinitions = await buildService.listDefinitions(
        settings,
        project
    );
    pending("buildDefinitions", false);
    return { buildDefinitions, selectedProject: project };
});

if (!patStore.empty()) {
    listProjects(patStore.first()!);
}

if (getAccount()) {
    listTenants();
}

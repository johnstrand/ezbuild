import { action, pending } from "./Store";

import { OrgSettings, patStore } from "./PatStore";
import { showToast } from "./AppToaster";
import { Project } from "./ApiTypes";

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
            validToken = false;
        }
        pending("validToken", false);
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
    // TODO: If any other organizations exist, pick the first one and load data
    return {
        orgs: patStore.remove(name),
        projects: selected ? [] : state.projects,
        selectedProject: selected ? null : state.selectedProject,
        selectedOrg: selected ? null : state.selectedOrg,
        buildDefinitions: selected ? [] : state.buildDefinitions
    };
});

export const listProjects = action<OrgSettings>(
    async ({ projectService }, settings) => {
        pending("projects", true);
        try {
            const projects = await projectService.list(settings);
            if (projects.length) {
                listBuildDefinitions({ settings, project: projects[0].name });
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

import { action, pending } from "./Store";
import { Api } from "./Api";

import { OrgSettings, patStore } from "./PatStore";
import { AppToaster } from "./AppToaster";
import { Project } from "./ApiTypes";

export const resetValidation = action(_ => {
    return { validToken: false };
});

export const tryAddOrganization = action<OrgSettings>(
    async ({ orgs, projects, selectedProject, selectedOrg }, settings) => {
        pending("validToken", true);
        const org = { ...settings };
        const first = patStore.empty();
        org.pat = patStore.encode(org.pat);
        let validToken = true;
        let p: Project[];
        try {
            p = await Api.projects.list(org);
            AppToaster.show({
                intent: "success",
                message: "Personal Access Token saved",
                timeout: 5000
            });
            orgs = patStore.add(org);
        } catch {
            AppToaster.show({
                intent: "danger",
                message: "Invalid configuration",
                timeout: 5000
            });
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

export const listProjects = action<OrgSettings>(async (_, settings) => {
    pending("projects", true);
    const projects = await Api.projects.list(settings);
    if (projects.length) {
        listBuildDefinitions({ settings, project: projects[0].name });
    }
    pending("projects", false);
    return {
        selectedOrg: settings,
        projects,
        selectedProject: projects[0].name
    };
});

export const listBuildDefinitions = action<{
    settings: OrgSettings;
    project: string;
}>(async (_, { settings, project }) => {
    pending("buildDefinitions", true);
    const buildDefinitions = await Api.builds.listDefinitions(
        settings,
        project
    );
    pending("buildDefinitions", false);
    return { buildDefinitions, selectedProject: project };
});

if (!patStore.empty()) {
    listProjects(patStore.first()!);
}

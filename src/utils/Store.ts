import createStore from "squawk-react";
import { OrgSettingsCollection, patStore, OrgSettings } from "./PatStore";
import { Project, BuildDefinition } from "./ApiTypes";
import { Api, ProjectService, BuildService } from "./Api";

interface AppState {
    orgs: OrgSettingsCollection;
    selectedOrg: OrgSettings | null;
    validToken: boolean;
    projects: Project[];
    selectedProject: string | null;
    buildDefinitions: BuildDefinition[];
    projectService: ProjectService;
    buildService: BuildService;
}

export const { action, useSquawk, pending, usePending, update } = createStore<
    AppState
>({
    orgs: patStore.get(),
    selectedOrg: patStore.first(),
    validToken: false,
    projects: [],
    selectedProject: null,
    buildDefinitions: [],
    projectService: Api.projects,
    buildService: Api.builds
});

import createStore from "squawk-react";
import { OrgSettingsCollection, patStore } from "./PatStore";
import { Project, BuildDefinition } from "./ApiTypes";

interface AppState {
    orgs: OrgSettingsCollection;
    validToken: boolean;
    projects: Project[];
    buildDefinitions: BuildDefinition[];
}

export const { action, useSquawk, pending, usePending, update } = createStore<
    AppState
>({
    orgs: patStore.get(),
    validToken: false,
    projects: [],
    buildDefinitions: []
});

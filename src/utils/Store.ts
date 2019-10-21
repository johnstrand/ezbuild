import createStore from "squawk-react";
import { OrgSettingsCollection, patStore } from "./PatStore";

interface AppState {
    orgs: OrgSettingsCollection;
    validToken: boolean;
}

export const { action, useSquawk, pending, usePending, update } = createStore<
    AppState
>({
    orgs: patStore.get(),
    validToken: false
});

import createStore from "./Squawk"; //"squawk-react";
import { OrgSettingsCollection, patStore, OrgSettings } from "./PatStore";
import { Project, BuildDefinition, AzureTenant } from "./ApiTypes";
import {
    Api,
    ProjectService,
    BuildService,
    RepositoryService,
    ReleaseService,
    ProfileService,
    AccountService
} from "./Api";
import { Account } from "msal";
import { getAccount } from "./Auth";

interface AppState {
    authority: string;
    tenants: AzureTenant[];
    account: Account;
    orgs: OrgSettingsCollection;
    selectedOrg: OrgSettings | null;
    validToken: boolean;
    projects: Project[];
    selectedProject: string | null;
    buildDefinitions: BuildDefinition[];
    projectService: ProjectService;
    buildService: BuildService;
    repositoryService: RepositoryService;
    releaseService: ReleaseService;
    profileService: ProfileService;
    accountService: AccountService;
}

export const { action, useSquawk, pending, usePending, update } = createStore<
    AppState
>({
    authority: "common",
    tenants: [],
    account: getAccount(),
    orgs: patStore.get(),
    selectedOrg: patStore.first(),
    validToken: false,
    projects: [],
    selectedProject: null,
    buildDefinitions: [],
    projectService: Api.projects,
    buildService: Api.builds,
    repositoryService: Api.repository,
    releaseService: Api.release,
    profileService: Api.profile,
    accountService: Api.account
});

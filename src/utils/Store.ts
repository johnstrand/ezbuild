import createStore from "./Squawk"; //"squawk-react";
import {
    Project,
    BuildDefinition,
    AzureTenant,
    Organization
} from "./ApiTypes";
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
    tenantId: string | null;
    account: Account;
    organizations: Organization[];
    organizationId: string | null;
    projects: Project[];
    projectId: string | null;
    buildDefinitions: BuildDefinition[];
    projectService: ProjectService;
    buildService: BuildService;
    repositoryService: RepositoryService;
    releaseService: ReleaseService;
    profileService: ProfileService;
    accountService: AccountService;
}

export const {
    action,
    useSquawk,
    pending,
    usePending,
    update,
    get: getStoreValue
} = createStore<AppState>({
    authority: "common",
    tenants: [],
    tenantId: null,
    account: getAccount(),
    organizations: [],
    organizationId: null,
    projects: [],
    projectId: null,
    buildDefinitions: [],
    projectService: Api.projects,
    buildService: Api.builds,
    repositoryService: Api.repository,
    releaseService: Api.release,
    profileService: Api.profile,
    accountService: Api.account
});

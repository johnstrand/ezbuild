import createStore from "utils/Squawk"; //"squawk-react";
import {
  Project,
  BuildDefinition,
  AzureTenant,
  Organization
} from "utils/ApiTypes";
import {
  ProjectService,
  BuildService,
  RepositoryService,
  ReleaseService,
  ProfileService,
  AccountService
} from "utils/Api/Interfaces";
import { Account } from "msal";
import { getAccount } from "utils/Auth";
import Api from "./Api/Api";

interface AppState {
  authority: string;
  tenantFilter: AzureTenant[];
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

export const { action, useSquawk, pending, usePending, update } = createStore<
  AppState
>({
  authority: "common",
  tenantFilter: JSON.parse(localStorage.getItem("tenantFilter")!) || [],
  tenants: [],
  tenantId: null,
  account: getAccount(),
  organizations: [],
  organizationId: null,
  projects: [],
  projectId: null,
  buildDefinitions: [],
  projectService: Api.projectService,
  buildService: Api.buildService,
  repositoryService: Api.repositoryService,
  releaseService: Api.releaseService,
  profileService: Api.profileService,
  accountService: Api.accountService
});

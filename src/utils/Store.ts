import createStore from "squawk-react";
import { Project, AzureTenant, Organization } from "utils/ApiTypes";
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
  tenantFilter: AzureTenant[];
  tenants: AzureTenant[];
  tenantId: string | null;
  account: Account;
  organizations: Organization[];
  organizationId: string | null;
  projects: Project[];
  projectId: string | null;
  projectService: ProjectService;
  buildService: BuildService;
  repositoryService: RepositoryService;
  releaseService: ReleaseService;
  profileService: ProfileService;
  accountService: AccountService;
}

export const { action, useSquawk, pending, usePending } = createStore<AppState>(
  {
    tenantFilter: JSON.parse(localStorage.getItem("tenantFilter")!) || [],
    tenants: [],
    tenantId: null,
    account: getAccount(),
    organizations: [],
    organizationId: null,
    projects: [],
    projectId: null,
    projectService: Api.projectService,
    buildService: Api.buildService,
    repositoryService: Api.repositoryService,
    releaseService: Api.releaseService,
    profileService: Api.profileService,
    accountService: Api.accountService
  }
);

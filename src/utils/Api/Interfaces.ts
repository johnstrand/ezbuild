import {
  Project,
  Profile,
  Organization,
  BuildDefinition,
  Build,
  BuildRequest,
  Branch,
  ReleaseDefinition,
  Approval
} from "utils/ApiTypes";

export interface ProjectService {
  list(tenantId: string, organizationId: string): Promise<Project[]>;
}

export interface ProfileService {
  get(tenantId: string): Promise<Profile>;
}

export interface AccountService {
  listAccounts(tenantId: string, profileId: string): Promise<Organization[]>;
}

export interface BuildService {
  listDefinitions(
    tenantId: string,
    organizationId: string,
    project: string
  ): Promise<BuildDefinition[]>;
  listBuilds(
    tenantId: string,
    organizationId: string,
    project: string
  ): Promise<Build[]>;
  listHistory(
    tenantId: string,
    organizationId: string,
    project: string,
    buildDefinitionId: number
  ): Promise<Build[]>;
  trigger(
    tenantId: string,
    organizationId: string,
    request: BuildRequest
  ): Promise<Build>;
}

export interface RepositoryService {
  listRepositories(): void; // GET https://dev.azure.com/{organization}/{project}/_apis/git/repositories?api-version=5.1
  listBranches(
    tenantId: string,
    organizationId: string,
    project: string,
    repository: string
  ): Promise<Branch[]>;
}

export interface ReleaseService {
  listDefinitions(
    tenantId: string,
    organizationId: string,
    project: string
  ): Promise<ReleaseDefinition[]>;

  listApprovals(
    tenantId: string,
    organizationId: string,
    project: string
  ): Promise<Approval[]>;
}

export default interface ApiService {
  profileService: ProfileService;
  accountService: AccountService;
  projectService: ProjectService;
  buildService: BuildService;
  repositoryService: RepositoryService;
  releaseService: ReleaseService;
}

import {
    ResponseList,
    Project,
    BuildDefinition,
    Build,
    BuildRequest,
    Branch,
    ReleaseDefinition,
    Profile,
    Organization
} from "./ApiTypes";
import { getToken, scopes } from "./Auth";

async function getHeaders(tenantId: string) {
    const token = await getToken(tenantId, scopes.devops);
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
}

async function get<T>(tenantId: string, organizationId: string, url: string) {
    const endpoint = `https://dev.azure.com/${organizationId}/${url}`;
    const headers = await getHeaders(tenantId);
    const result = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        headers
    }).then<T>(res => res.json());
    return result;
}

async function getVsrm<T>(
    tenantId: string,
    organizationId: string,
    url: string
) {
    const endpoint = `https://vsrm.dev.azure.com/${organizationId}/${url}`;
    const headers = await getHeaders(tenantId);
    const result = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        headers
    }).then<T>(res => res.json());
    return result;
}

async function post<T>(
    tenantId: string,
    organizationId: string,
    url: string,
    data?: any
) {
    const endpoint = `https://dev.azure.com/${organizationId}/${url}`;
    const headers = await getHeaders(tenantId);
    const result = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify(data)
    }).then<T>(res => res.json());
    return result;
}

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
}

export interface Api {
    profile: ProfileService;
    account: AccountService;
    projects: ProjectService;
    builds: BuildService;
    repository: RepositoryService;
    release: ReleaseService;
}

export const Api: Api = {
    profile: {
        async get(tenantId: string) {
            const token = await getToken(tenantId, scopes.devops);
            const response = await fetch(
                "https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=5.1",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const profile = (await response.json()) as Profile;

            return profile;
        }
    },
    account: {
        async listAccounts(tenantId: string, profileId: string) {
            const token = await getToken(tenantId, scopes.devops);
            const response = await fetch(
                `https://app.vssps.visualstudio.com/_apis/accounts?memberId=${profileId}&api-version=5.1`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const organizations = ((await response.json()) as ResponseList<
                Organization
            >).value;

            return organizations;
        }
    },
    repository: {
        listRepositories() {},
        async listBranches(
            tenantId: string,
            organizationId: string,
            project: string,
            repository: string
        ) {
            const result = await get<ResponseList<Branch>>(
                tenantId,
                organizationId,
                `${project}/_apis/git/repositories/${repository}/stats/branches?api-version=5.1`
            );

            return result.value;
        }
    },
    projects: {
        async list(tenantId: string, organizationId: string) {
            const response = await get<ResponseList<Project>>(
                tenantId,
                organizationId,
                `_apis/projects?api-version=5.1`
            );

            return response.value;
        }
    },
    builds: {
        async listDefinitions(
            tenantId: string,
            organizationId: string,
            project: string
        ) {
            const response = await get<ResponseList<BuildDefinition>>(
                tenantId,
                organizationId,
                `${project}/_apis/build/definitions?includeAllProperties=true&api-version=5.1`
            );

            return response.value;
        },
        async listHistory(
            tenantId: string,
            organizationId: string,
            project: string,
            buildDefinitionId: number
        ) {
            const response = await get<ResponseList<Build>>(
                tenantId,
                organizationId,
                `${project}/_apis/build/builds?definitions=${buildDefinitionId}&api-version=5.1`
            );

            return response.value;
        },
        async trigger(
            tenantId: string,
            organizationId: string,
            request: BuildRequest
        ) {
            return await post<Build>(
                tenantId,
                organizationId,
                `${request.project.id}/_apis/build/builds?ignoreWarnings=false&api-version=5.1`,
                request
            );
        }
    },
    release: {
        async listDefinitions(
            tenantId: string,
            organizationId: string,
            project: string
        ) {
            const result = await getVsrm<ResponseList<ReleaseDefinition>>(
                tenantId,
                organizationId,
                `${project}/_apis/release/definitions?api-version=5.1`
            );

            return result.value;
        }
    }
};

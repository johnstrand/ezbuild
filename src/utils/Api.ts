import { OrgSettings } from "./PatStore";
import {
    ResponseList,
    Project,
    BuildDefinition,
    Build,
    BuildRequest
} from "./ApiTypes";

function getHeaders(pat: string) {
    return {
        Authorization: `Basic ${pat}`,
        "Content-Type": "application/json"
    };
}

async function get<T>(org: OrgSettings, url: string) {
    const endpoint = `https://dev.azure.com/${org.name}/${url}`;
    const headers = getHeaders(org.pat);
    const result = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        headers
    }).then<T>(res => res.json());
    return result;
}

async function post<T>(org: OrgSettings, url: string, data?: any) {
    const endpoint = `https://dev.azure.com/${org.name}/${url}`;
    const headers = getHeaders(org.pat);
    const result = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers,
        body: data ? null : JSON.stringify(data)
    }).then<T>(res => res.json());
    return result;
}

export interface ProjectService {
    list(org: OrgSettings): Promise<Project[]>;
}

export interface BuildService {
    listDefinitions(
        org: OrgSettings,
        project: string
    ): Promise<BuildDefinition[]>;
    listHistory(
        org: OrgSettings,
        project: string,
        buildDefinitionId: number
    ): Promise<Build[]>;
    trigger(org: OrgSettings, request: BuildRequest): Promise<Build>;
}

export interface RepositoryService {
    listRepositories(): void; // GET https://dev.azure.com/{organization}/{project}/_apis/git/repositories?api-version=5.1
    listBranches(): void; // GET https://dev.azure.com/{organization}/{project}/_apis/git/repositories/{repositoryId}/stats/branches?api-version=5.1
}

export interface Api {
    projects: ProjectService;
    builds: BuildService;
}

export const Api: Api = {
    projects: {
        async list(org: OrgSettings) {
            const response = await get<ResponseList<Project>>(
                org,
                `_apis/projects?api-version=5.1`
            );

            return response.value;
        }
    },
    builds: {
        async listDefinitions(org: OrgSettings, project: string) {
            const response = await get<ResponseList<BuildDefinition>>(
                org,
                `${project}/_apis/build/definitions?includeAllProperties=true&api-version=5.1`
            );

            return response.value;
        },
        async listHistory(
            org: OrgSettings,
            project: string,
            buildDefinitionId: number
        ) {
            const response = await get<ResponseList<Build>>(
                org,
                `${project}/_apis/build/builds?definitions=${buildDefinitionId}&api-version=5.1`
            );

            return response.value;
        },
        async trigger(org: OrgSettings, request: BuildRequest) {
            return await post<Build>(
                org,
                `${request.project.id}/_apis/build/builds?ignoreWarnings=false`,
                request
            );
        }
    }
};

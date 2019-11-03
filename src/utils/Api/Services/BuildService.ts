import { BuildService } from "../Interfaces";
import { get, post } from "../FetchWrappers";
import {
    ResponseList,
    BuildDefinition,
    Build,
    BuildRequest
} from "utils/ApiTypes";

const buildService: BuildService = {
    async listDefinitions(
        tenantId: string,
        organizationId: string,
        project: string
    ) {
        const response = await get<ResponseList<BuildDefinition>>(
            tenantId,
            organizationId,
            `${project}/_apis/build/definitions?includeAllProperties=true&includeLatestBuilds=true&api-version=5.1`
        );

        return response.value;
    },
    async listBuilds(
        tenantId: string,
        organizationId: string,
        project: string
    ) {
        const response = await get<ResponseList<Build>>(
            tenantId,
            organizationId,
            `${project}/_apis/build/builds?maxBuildsPerDefinition=1&deletedFilter=excludeDeleted&api-version=5.1`
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
};

export default buildService;

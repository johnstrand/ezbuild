import { RepositoryService } from "../Interfaces";
import { ResponseList, Branch } from "utils/ApiTypes";
import { get } from "../FetchWrappers";

const repositoryService: RepositoryService = {
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
};

export default repositoryService;

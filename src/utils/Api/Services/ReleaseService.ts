import { ReleaseService } from "../Interfaces";
import { getVsrm } from "../FetchWrappers";
import { ResponseList, ReleaseDefinition } from "utils/ApiTypes";

const releaseService: ReleaseService = {
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
};

export default releaseService;

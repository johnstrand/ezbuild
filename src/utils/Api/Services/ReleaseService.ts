import { ReleaseService } from "../Interfaces";
import { getVsrm } from "../FetchWrappers";
import { ResponseList, ReleaseDefinition, Approval } from "utils/ApiTypes";

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
  },

  async listApprovals(
    tenantId: string,
    organizationId: string,
    project: string
  ) {
    const result = await getVsrm<ResponseList<Approval>>(
      tenantId,
      organizationId,
      `${project}/_apis/release/approvals?api-version=5.1`
    );

    return result.value;
  }
};

export default releaseService;

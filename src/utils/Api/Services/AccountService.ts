import { getVssp } from "../FetchWrappers";
import { ResponseList, Organization } from "utils/ApiTypes";
import { AccountService } from "../Interfaces";

const accountService: AccountService = {
    async listAccounts(tenantId: string, profileId: string) {
        const response = await getVssp<ResponseList<Organization>>(
            tenantId,
            `_apis/accounts?memberId=${profileId}&api-version=5.1`
        );
        return response.value;
    }
};

export default accountService;

import { getVssp } from "../FetchWrappers";
import { ProfileService } from "../Interfaces";

const profileService: ProfileService = {
    async get(tenantId: string) {
        return await getVssp(
            tenantId,
            "_apis/profile/profiles/me?api-version=5.1"
        );
    }
};

export default profileService;

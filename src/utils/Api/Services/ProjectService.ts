import { get } from "../FetchWrappers";
import { ResponseList, Project as IProject } from "utils/ApiTypes";
import { ProjectService } from "../Interfaces";

const projectService: ProjectService = {
    async list(tenantId: string, organizationId: string) {
        const response = await get<ResponseList<IProject>>(
            tenantId,
            organizationId,
            `_apis/projects?api-version=5.1`
        );

        return response.value;
    }
};

export default projectService;

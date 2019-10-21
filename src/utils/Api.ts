import { OrgSettings } from "./PatStore";
import { ResponseList, Project } from "./ApiTypes";

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

export const Api = {
    projects: {
        async list(org: OrgSettings) {
            const response = await get<ResponseList<Project>>(
                org,
                `_apis/projects?api-version=5.1`
            );

            return response.value;
        }
    }
};

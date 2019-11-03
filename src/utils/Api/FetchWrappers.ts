import { getToken, scopes } from "utils/Auth";

export async function getHeaders(tenantId: string) {
    const token = await getToken(tenantId, scopes.devops);
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
}

export async function post<T>(
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

export async function get<T>(
    tenantId: string,
    organizationId: string,
    url: string
) {
    const endpoint = `https://dev.azure.com/${organizationId}/${url}`;
    const headers = await getHeaders(tenantId);
    const result = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        headers
    }).then<T>(res => res.json());
    return result;
}

export async function getVsrm<T>(
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

export async function getVssp<T>(tenantId: string, url: string) {
    const token = await getToken(tenantId, scopes.devops);
    const response = await fetch(`https://app.vssps.visualstudio.com/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const result = (await response.json()) as T;
    return result;
}

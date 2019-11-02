import { Configuration, UserAgentApplication } from "msal";
import { AzureTenant, ResponseList } from "./ApiTypes";

const msalConfig: Configuration = {
    auth: {
        clientId: "0423268c-4035-4f17-a955-808798af30ad",
        authority: "https://login.microsoftonline.com/common",
        validateAuthority: true
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

export enum scopes {
    azure = "https://management.azure.com/user_impersonation",
    devops = "499b84ac-1321-427f-aa17-267ca6975798/user_impersonation"
}

const endpoint = "https://management.azure.com/tenants?api-version=2019-06-01";

const requiresInteraction = (errorMessage: string) => {
    if (!errorMessage || !errorMessage.length) {
        return false;
    }

    return (
        errorMessage.indexOf("consent_required") !== -1 ||
        errorMessage.indexOf("interaction_required") !== -1 ||
        errorMessage.indexOf("login_required") !== -1
    );
};

const app = new UserAgentApplication(msalConfig);

export function getAccount() {
    return app.getAccount();
}

export async function getToken(
    authority: string,
    scope: string
): Promise<string> {
    const request = {
        scopes: [scope],
        authority: "https://login.microsoftonline.com/" + authority
    };
    if (!app.getAccount()) {
        await app.loginPopup(request);
    }
    try {
        return (await app.acquireTokenSilent(request)).accessToken;
    } catch (error) {
        if (requiresInteraction(error)) {
            await app.loginPopup(request);
            return await getToken(authority, scope);
        } else {
            return (await app.acquireTokenPopup(request)).accessToken;
        }
    }
}

export async function getTenants(): Promise<AzureTenant[]> {
    const token = await getToken("common", scopes.azure);
    const response = await fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = (await response.json()) as ResponseList<AzureTenant>;

    return data.value;
}

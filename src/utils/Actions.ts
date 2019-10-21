import { action, pending } from "./Store";
import { Api } from "./Api";

import { OrgSettings, patStore } from "./PatStore";
import { AppToaster } from "./AppToaster";

export const resetValidation = action(_ => {
    return { validToken: false };
});

export const validateOrganization = action<OrgSettings>(
    async ({ orgs }, settings) => {
        pending("validToken", true);
        const org = { ...settings };
        org.pat = patStore.encode(org.pat);

        let validToken = true;
        try {
            await Api.projects.list(org);
            AppToaster.show({
                intent: "success",
                message: "Personal Access Token saved",
                timeout: 5000
            });
            orgs = patStore.add(org);
        } catch {
            AppToaster.show({
                intent: "danger",
                message: "Invalid configuration",
                timeout: 5000
            });
            validToken = false;
        }
        pending("validToken", false);
        return { validToken, orgs };
    }
);

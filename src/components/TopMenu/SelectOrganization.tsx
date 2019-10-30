import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { listProjects } from "../../utils/Actions";
import { Dropdown } from "../Common/Dropdown";

export const SelectOrganization = () => {
    const { organizations, tenantId } = useSquawk("organizations", "tenantId");
    const loading = usePending("organizations");

    const selectOrg = (organizationId: string) => {
        listProjects({ tenantId: tenantId!, organizationId });
    };

    const items = organizations.map(o => ({
        key: o.accountId,
        value: o.accountName,
        text: o.accountName
    }));

    return (
        <Dropdown<string>
            loading={loading}
            items={items}
            onChange={selectOrg}
            noData="No Azure DevOps organizations found in tenant"
        />
    );
};

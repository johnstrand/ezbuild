import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { listOrganizations } from "../../utils/Actions";
import { Dropdown } from "../Common/Dropdown";

export const SelectTenant = () => {
    const { tenants } = useSquawk("tenants");
    const loading = usePending("tenants");

    const items = tenants.map(t => ({
        key: t.tenantId,
        value: t.tenantId,
        text: `${t.displayName} (${t.domains[t.domains.length - 1]})`
    }));

    return (
        <Dropdown<string>
            loading={loading}
            items={items}
            onChange={tenant => listOrganizations(tenant)}
            noData="No Azure tenants found"
        />
    );
};

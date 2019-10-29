import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { listProjects } from "../../utils/Actions";

export const SelectOrganization = () => {
    const { organizations, tenantId } = useSquawk("organizations", "tenantId");
    const loading = usePending("organizations");

    const selectOrg = (organizationId: string) => {
        listProjects({ tenantId: tenantId!, organizationId });
    };

    if (organizations.length === 0 && !loading) {
        return <div>No Azure DevOps organisations found in tenant</div>;
    }

    return (
        <div className="bp3-select">
            <select onChange={ev => selectOrg(ev.currentTarget.value)}>
                {organizations.map(organization => (
                    <option
                        key={organization.accountId}
                        value={organization.accountName}
                    >
                        {organization.accountName}
                    </option>
                ))}
            </select>
        </div>
    );
};

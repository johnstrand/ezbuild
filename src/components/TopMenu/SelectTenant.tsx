import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { Spinner } from "@blueprintjs/core";
import { listOrganizations } from "../../utils/Actions";

export const SelectTenant = () => {
    const { tenants } = useSquawk("tenants");
    const loading = usePending("tenants");

    return (
        <div className="bp3-select">
            {loading ? (
                <Spinner size={Spinner.SIZE_SMALL} />
            ) : (
                <select
                    onChange={({ currentTarget: { value } }) =>
                        listOrganizations(value)
                    }
                >
                    {tenants.map(t => (
                        <option key={t.id} value={t.tenantId}>
                            {t.displayName} ({t.domains[t.domains.length - 1]})
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

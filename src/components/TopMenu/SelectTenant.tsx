import React from "react";
import { useSquawk, usePending } from "utils/Store";
import Dropdown from "components/Common/Dropdown";
import { listOrganizations } from "utils/Actions";

const SelectTenant = () => {
  const { tenants, tenantId } = useSquawk("tenants", "tenantId");
  const loading = usePending("tenants");

  const items = tenants.map(t => ({
    key: t.tenantId,
    value: t.tenantId,
    text: `${t.displayName} (${t.domains[t.domains.length - 1]})`
  }));

  return (
    <Dropdown<string>
      loading={loading}
      value={tenantId || undefined}
      items={items}
      onChange={listOrganizations}
      noData="No Azure tenants found"
    />
  );
};

export default SelectTenant;

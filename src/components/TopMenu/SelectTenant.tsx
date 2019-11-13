import React from "react";
import { useSquawk, usePending } from "utils/Store";
import { loadSelection } from "utils/Actions";
import Dropdown from "components/Common/Dropdown";

const selectTenant = async (tenantId: string) => {
  loadSelection({ tenantId });
};

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
      onChange={tenant => selectTenant(tenant)}
      noData="No Azure tenants found"
    />
  );
};

export default SelectTenant;

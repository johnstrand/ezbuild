import React from "react";
import { useSquawk, usePending } from "utils/Store";
import { loadSelection } from "utils/Actions";
import Dropdown from "components/Common/Dropdown";

const selectOrg = (tenantId: string, organizationId: string) => {
  loadSelection({ tenantId, organizationId });
};

const SelectOrganization = () => {
  const { organizations, tenantId, organizationId } = useSquawk(
    "organizations",
    "tenantId",
    "organizationId"
  );
  const loading = usePending("organizations");

  const items = organizations.map(o => ({
    key: o.accountId,
    value: o.accountName,
    text: o.accountName
  }));

  return (
    <Dropdown<string>
      loading={loading}
      value={organizationId || undefined}
      items={items}
      onChange={value => selectOrg(tenantId!, value)}
      noData="No Azure DevOps organizations found in tenant"
    />
  );
};

export default SelectOrganization;

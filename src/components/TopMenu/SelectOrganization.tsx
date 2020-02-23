import React from "react";
import { useSquawk, usePending } from "utils/Store";
import Dropdown from "components/Common/Dropdown";
import { listProjects } from "utils/Actions";

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
      onChange={orgId =>
        listProjects({ tenantId: tenantId!, organizationId: orgId })
      }
      noData="No Azure DevOps organizations found in tenant"
    />
  );
};

export default SelectOrganization;

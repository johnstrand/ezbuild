import React from "react";
import { useSquawk, usePending } from "utils/Store";
import { loadSelection } from "utils/Actions";
import Dropdown from "components/Common/Dropdown";

const selectProject = (
  tenantId: string,
  organizationId: string,
  projectId: string
) => {
  loadSelection({ tenantId, organizationId, projectId });
};

const SelectProject = () => {
  const { projects, tenantId, organizationId, projectId } = useSquawk(
    "projects",
    "tenantId",
    "organizationId",
    "projectId"
  );
  const loading = usePending("projects");

  const items = projects.map(p => ({
    key: p.id,
    value: p.id,
    text: p.name
  }));

  return (
    <Dropdown<string>
      items={items}
      onChange={value => selectProject(tenantId!, organizationId!, value)}
      loading={loading}
      noData="No projects found"
      value={projectId || undefined}
    />
  );
};

export default SelectProject;

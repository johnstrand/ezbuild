import React from "react";
import { useSquawk, usePending } from "utils/Store";
import Dropdown from "components/Common/Dropdown";
import { selectProject } from "utils/Actions";

const SelectProject = () => {
  const { projects, projectId } = useSquawk("projects", "projectId");
  const loading = usePending("projects");

  const items = projects.map(p => ({
    key: p.id,
    value: p.id,
    text: p.name
  }));

  return (
    <Dropdown<string>
      items={items}
      onChange={selectProject}
      loading={loading}
      noData="No projects found"
      value={projectId || undefined}
    />
  );
};

export default SelectProject;

import React, { useState, useEffect } from "react";
import { useSquawk, usePending } from "utils/Store";
import { Spinner, HTMLTable } from "@blueprintjs/core";
import HTMLTableSingleHeader from "components/Common/Table/HTMLTableSingleHeader";
import HTMLTableNoDataRow from "components/Common/Table/HTMLTableNoDataRow";
import { releaseDefinitionCompare } from "utils/Comparers";
import { ReleaseDefinition, Approval } from "utils/ApiTypes";

const ReleaseDefinitionList = () => {
  const { releaseService, tenantId, organizationId, projectId } = useSquawk(
    "releaseService",
    "tenantId",
    "organizationId",
    "projectId"
  );

  const projectsLoading = usePending("projects");
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<[ReleaseDefinition[], Approval[]]>([
    [],
    []
  ]);

  const load = async () => {
    setLoading(true);
    const response = await Promise.all([
      await releaseService.listDefinitions(
        tenantId!,
        organizationId!,
        projectId!
      ),
      await releaseService.listApprovals(tenantId!, organizationId!, projectId!)
    ]);
    setState(response);
    setLoading(false);
  };

  useEffect(() => {
    if (!tenantId || !organizationId || !projectId) {
      return;
    }
    load();
    const id = window.setInterval(() => {
      if (loading || projectsLoading) {
        return;
      }
      load();
    }, 60000);

    return () => window.clearInterval(id);
  });

  if (loading && projectsLoading) {
    return <Spinner size={Spinner.SIZE_LARGE} />;
  }

  const [releaseDefinitions, approvals] = state;

  return (
    <HTMLTable bordered striped style={{ width: "100%" }}>
      <HTMLTableSingleHeader>
        <th>Name</th>
        <th>Path</th>
        <th>Approvals</th>
      </HTMLTableSingleHeader>
      <tbody>
        <HTMLTableNoDataRow
          columns={3}
          text="This project does not have any releases defined"
          visible={releaseDefinitions.length === 0}
        />
        {releaseDefinitions.sort(releaseDefinitionCompare).map(r => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.path}</td>
            <td>
              {approvals
                .filter(a => a.releaseDefinition.id === r.id)
                .map(r => r.releaseEnvironment.name)
                .join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};

export default ReleaseDefinitionList;

import React from "react";
import { useSquawk, usePending } from "utils/Store";
import { Spinner, HTMLTable } from "@blueprintjs/core";
import HTMLTableSingleHeader from "components/Common/Table/HTMLTableSingleHeader";
import HTMLTableNoDataRow from "components/Common/Table/HTMLTableNoDataRow";
import { releaseDefinitionCompare } from "utils/Comparers";

const ReleaseDefinitionList = () => {
  const { releaseDefinitions, approvals } = useSquawk(
    "releaseDefinitions",
    "approvals"
  );
  const loading = usePending("releaseDefinitions");

  if (loading) {
    return <Spinner size={Spinner.SIZE_LARGE} />;
  }

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

import React, { useEffect, useState, useCallback } from "react";
import { useSquawk, usePending } from "utils/Store";
import { HTMLTable, Spinner } from "@blueprintjs/core";
import HTMLTableNoDataRow from "components/Common/Table/HTMLTableNoDataRow";
import HTMLTableSingleHeader from "components/Common/Table/HTMLTableSingleHeader";
import { buildDefinitionCompare } from "utils/Comparers";
import BuildDefinitionListItem from "./BuildDefinitionListItem";
import Button from "components/Common/Button";
import { BuildDefinition } from "utils/ApiTypes";

const BuildDefinitionList = () => {
  const { buildService, tenantId, organizationId, projectId } = useSquawk(
    "buildService",
    "tenantId",
    "organizationId",
    "projectId"
  );

  console.log(projectId);

  const projectsLoading = usePending("projects");
  const [loading, setLoading] = useState(true);
  const [definitions, setDefinitions] = useState<BuildDefinition[]>([]);

  const load = useCallback(async () => {
    console.log("Loading");
    if (!tenantId || !organizationId || !projectId) {
      return;
    }
    console.log({ loading, projectsLoading });
    if (loading || projectsLoading) {
      return;
    }
    setLoading(true);
    const defs = await buildService.listDefinitions(
      tenantId!,
      organizationId!,
      projectId!
    );
    setDefinitions(defs);
    setLoading(false);
  }, [
    tenantId,
    organizationId,
    projectId,
    buildService,
    loading,
    projectsLoading
  ]);

  useEffect(() => {
    load();
    const id = window.setInterval(() => {
      load();
    }, 60000);

    return () => window.clearInterval(id);
  }, [tenantId, organizationId, projectId, load]);

  if (loading && projectsLoading) {
    return <Spinner size={Spinner.SIZE_LARGE} />;
  }

  return (
    <div>
      <Button
        icon="refresh"
        disabled={loading}
        tooltip="Refresh builds"
        onClick={load}
      />
      <HTMLTable bordered striped style={{ width: "100%" }}>
        <HTMLTableSingleHeader>
          <th>Name</th>
          <th>Path</th>
          <th>Repository</th>
          <th>Latest build</th>
          <th></th>
        </HTMLTableSingleHeader>
        <tbody>
          <HTMLTableNoDataRow
            columns={5}
            text="This project does not have any builds defined"
            visible={definitions.length === 0}
          />
          {definitions.sort(buildDefinitionCompare).map(b => (
            <BuildDefinitionListItem key={b.id} definition={b} />
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
};

export default BuildDefinitionList;

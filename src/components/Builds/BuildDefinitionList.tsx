import React, { useEffect, useState } from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { HTMLTable, Spinner } from "@blueprintjs/core";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { stringCompare } from "../../utils/Comparers";
import { BuildDefinitionListItem } from "./BuildDefinitionListItem";
import { Button } from "../Common/Button";
import { listBuildDefinitions } from "../../utils/Actions";

export const BuildDefinitionList = () => {
    const { buildDefinitions, tenantId, organizationId, projectId } = useSquawk(
        "buildDefinitions",
        "tenantId",
        "organizationId",
        "projectId"
    );
    const loading = usePending("buildDefinitions");
    const [refreshing, setRefreshing] = useState(false);

    const refresh = async () => {
        setRefreshing(true);
        await listBuildDefinitions({
            tenantId: tenantId!,
            organizationId: organizationId!,
            project: projectId!
        });
        setRefreshing(false);
    };

    useEffect(() => {
        const id = window.setInterval(() => {
            if (refreshing || loading) {
                return;
            }
            refresh();
        }, 10000);

        return () => window.clearInterval(id);
    });

    if (loading && !refreshing) {
        return <Spinner size={Spinner.SIZE_LARGE} />;
    }

    return (
        <div>
            <Button
                icon="refresh"
                disabled={refreshing}
                tooltip="Refresh builds"
                onClick={refresh}
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
                        visible={buildDefinitions.length === 0}
                    />
                    {buildDefinitions
                        .sort(
                            (a, b) =>
                                stringCompare(a.path, b.path) ||
                                stringCompare(a.name, b.name)
                        )
                        .map(b => (
                            <BuildDefinitionListItem
                                key={b.id}
                                definition={b}
                            />
                        ))}
                </tbody>
            </HTMLTable>
        </div>
    );
};

import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { HTMLTable, ButtonGroup, Spinner } from "@blueprintjs/core";
import { BuildDefinitionHistory } from "./BuildDefinitionHistory";
import { BuildQueue } from "./BuildQueue";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { stringCompare } from "../../utils/Comparers";
import { BuildDefinitionListItem } from "./BuildDefinitionListItem";

export const BuildDefinitionList = () => {
    const { buildDefinitions } = useSquawk("buildDefinitions");
    const loading = usePending("buildDefinitions");

    if (loading) {
        return <Spinner size={Spinner.SIZE_LARGE} />;
    }

    return (
        <div>
            <HTMLTable bordered striped style={{ width: "100%" }}>
                <HTMLTableSingleHeader>
                    <th>Name</th>
                    <th>Path</th>
                    <th>Repository</th>
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

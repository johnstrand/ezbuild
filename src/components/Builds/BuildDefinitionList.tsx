import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import { HTMLTable, ButtonGroup, Spinner } from "@blueprintjs/core";
import { BuildDefinitionHistory } from "./BuildDefinitionHistory";
import { BuildQueue } from "./BuildQueue";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { stringCompare } from "../../utils/Comparers";

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
                        .map(b => {
                            return (
                                <tr key={b.id}>
                                    <td>{b.name}</td>
                                    <td>{b.path}</td>
                                    <td>{b.repository.name}</td>
                                    <td>
                                        <ButtonGroup>
                                            <BuildDefinitionHistory
                                                id={b.id}
                                                name={b.name}
                                            />
                                            <BuildQueue
                                                id={b.id}
                                                name={b.name}
                                                repository={b.repository}
                                                variables={b.variables}
                                            />
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </HTMLTable>
        </div>
    );
};

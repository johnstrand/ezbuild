import React, { useState } from "react";
import { useSquawk, usePending } from "../../utils/Store";
import {
    HTMLTable,
    Checkbox,
    Button,
    ButtonGroup,
    Spinner
} from "@blueprintjs/core";
import { BuildDefinitionHistory } from "./BuildDefinitionHistory";
import { BuildQueue } from "./BuildQueue";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";

export const BuildDefinitionList = () => {
    const { buildDefinitions } = useSquawk("buildDefinitions");
    const loading = usePending("buildDefinitions");
    const [selected, setSelected] = useState<number[]>([]);

    const handleSelect = (id?: number) => ({
        currentTarget: { checked }
    }: React.FormEvent<HTMLInputElement>) => {
        if (checked) {
            setSelected(
                !id ? buildDefinitions.map(b => b.id) : [...selected, id]
            );
        } else {
            setSelected(!id ? [] : selected.filter(s => s !== id));
        }
    };

    if (loading) {
        return <Spinner size={Spinner.SIZE_LARGE} />;
    }

    const allChecked =
        selected.length === buildDefinitions.length &&
        buildDefinitions.length > 0;
    const someChecked = selected.length > 0 && buildDefinitions.length > 0;

    return (
        <div>
            <Button
                text={
                    selected.length === 0
                        ? "Nothing selected"
                        : `Queue ${selected.length} build${
                              selected.length === 1 ? "" : "s"
                          }`
                }
                disabled={selected.length === 0}
                intent="primary"
            />
            <HTMLTable bordered striped style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ width: 20 }}>
                            <Checkbox
                                disabled={buildDefinitions.length === 0}
                                checked={allChecked}
                                indeterminate={someChecked && !allChecked}
                                onChange={handleSelect()}
                            />
                        </th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Repository</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <HTMLTableNoDataRow
                        columns={5}
                        text="This project does not have any builds defined"
                        visible={buildDefinitions.length === 0}
                    />
                    {buildDefinitions
                        .sort((a, b) => (a.path > b.path ? 1 : -1))
                        .map(b => {
                            const currentlySelected = selected.includes(b.id);

                            return (
                                <tr key={b.id}>
                                    <td>
                                        <Checkbox
                                            checked={currentlySelected}
                                            onClick={handleSelect(b.id)}
                                        />
                                    </td>
                                    <td>{b.name}</td>
                                    <td>{b.path}</td>
                                    <td>{b.repository.name}</td>
                                    <td>
                                        <ButtonGroup>
                                            <BuildDefinitionHistory
                                                id={b.id}
                                                name={b.name}
                                            />
                                            <BuildQueue />
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

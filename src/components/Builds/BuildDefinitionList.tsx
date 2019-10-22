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

export const BuildDefinitionList = () => {
    const { buildDefinitions } = useSquawk("buildDefinitions");
    const loading = usePending("buildDefinitions");
    const [selected, setSelected] = useState<number[]>([]);

    const handleSelect = (currentlySelected: boolean, id: number) => {
        setSelected(
            !currentlySelected
                ? [...selected, id]
                : selected.filter(s => s !== id)
        );
    };

    if (loading) {
        return <Spinner size={Spinner.SIZE_LARGE} />;
    }

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
                                checked={
                                    selected.length === buildDefinitions.length
                                }
                                indeterminate={
                                    selected.length > 0 &&
                                    selected.length !== buildDefinitions.length
                                }
                                onChange={ev =>
                                    setSelected(
                                        ev.currentTarget.checked
                                            ? buildDefinitions.map(b => b.id)
                                            : []
                                    )
                                }
                            />
                        </th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Repository</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {buildDefinitions.length === 0 && (
                        <tr>
                            <td colSpan={5}>
                                This repository does not have any builds defined
                            </td>
                        </tr>
                    )}
                    {buildDefinitions
                        .sort((a, b) => (a.path > b.path ? 1 : -1))
                        .map(b => {
                            const currentlySelected = selected.includes(b.id);

                            return (
                                <tr key={b.id}>
                                    <td>
                                        <Checkbox
                                            checked={currentlySelected}
                                            onClick={() =>
                                                handleSelect(
                                                    currentlySelected,
                                                    b.id
                                                )
                                            }
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

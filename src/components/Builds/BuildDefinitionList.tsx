import React, { useState } from "react";
import { useSquawk } from "../../utils/Store";
import { HTMLTable, Checkbox, Button, ButtonGroup } from "@blueprintjs/core";

export const BuildDefinitionList = () => {
    const { buildDefinitions } = useSquawk("buildDefinitions");
    const [selected, setSelected] = useState<number[]>([]);
    return (
        <div>
            <Button
                text="Queue build"
                disabled={selected.length === 0}
                intent="primary"
            />
            <HTMLTable bordered striped interactive style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {buildDefinitions
                        .sort((a, b) => (a.path > b.path ? 1 : -1))
                        .map(b => {
                            const checked = selected.includes(b.id);
                            return (
                                <tr
                                    key={b.id}
                                    onClick={() =>
                                        setSelected(
                                            !checked
                                                ? [...selected, b.id]
                                                : selected.filter(
                                                      s => s !== b.id
                                                  )
                                        )
                                    }
                                >
                                    <td>
                                        <Checkbox checked={checked} />
                                    </td>
                                    <td>{b.name}</td>
                                    <td>{b.path}</td>
                                    <td
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <ButtonGroup>
                                            <Button icon="history" />
                                            <Button
                                                icon="play"
                                                intent="primary"
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

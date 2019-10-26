import React from "react";
import { BuildDefinition } from "../../utils/ApiTypes";
import { ButtonGroup } from "@blueprintjs/core";
import { BuildDefinitionHistory } from "./BuildDefinitionHistory";
import { BuildQueue } from "./BuildQueue";

interface Props {
    definition: BuildDefinition;
}

export const BuildDefinitionListItem = ({ definition }: Props) => {
    return (
        <tr key={definition.id}>
            <td>{definition.name}</td>
            <td>{definition.path}</td>
            <td>{definition.repository.name}</td>
            <td>
                <ButtonGroup>
                    <BuildDefinitionHistory
                        id={definition.id}
                        name={definition.name}
                    />
                    <BuildQueue
                        id={definition.id}
                        name={definition.name}
                        repository={definition.repository}
                        variables={definition.variables}
                        queue={definition.queue}
                    />
                </ButtonGroup>
            </td>
        </tr>
    );
};

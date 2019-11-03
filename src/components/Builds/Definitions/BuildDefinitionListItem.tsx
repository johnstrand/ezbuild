import React, { memo } from "react";
import { BuildDefinition } from "../../../utils/ApiTypes";
import { ButtonGroup } from "@blueprintjs/core";
import { BuildHistoryList } from "../BuildHistoryList";
import { BuildQueue } from "../Queue/BuildQueue";
import { BuildStatusIcon } from "../BuildStatusIcon";
import { BuildDefinitionProcess } from "../Process/BuildDefinitionProcess";

interface Props {
    definition: BuildDefinition;
}

const BuildDefinitionListItem = ({ definition }: Props) => {
    return (
        <tr key={definition.id}>
            <td>{definition.name}</td>
            <td>{definition.path}</td>
            <td>{definition.repository.name}</td>
            <td>
                {definition.latestBuild && (
                    <>
                        <BuildStatusIcon
                            result={definition.latestBuild.result}
                            status={definition.latestBuild.status}
                        />
                        {definition.latestBuild.buildNumber}
                    </>
                )}
            </td>
            <td>
                <ButtonGroup>
                    <BuildHistoryList
                        id={definition.id}
                        name={definition.name}
                    />
                    <BuildDefinitionProcess process={definition.process} />
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

export default memo(BuildDefinitionListItem);

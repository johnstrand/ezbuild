import React from "react";
import { ReleaseDefinition, Approval } from "utils/ApiTypes";
import Button from "components/Common/Button";

interface Props {
  definition: ReleaseDefinition;
  approvals: Approval[];
}

const ReleaseDefinitionListItem = (props: Props) => {
  const { definition, approvals } = props;
  return (
    <tr>
      <td>{definition.name}</td>
      <td>{definition.path}</td>
      <td>
        {approvals.map(r => (
          <Button
            text={r.releaseEnvironment.name}
            tooltip={`Approve release to ${r.releaseEnvironment.name}`}
          />
        ))}
      </td>
      <td>
        <Button tooltip="View history" icon="history" />
        <Button tooltip="View release definition" icon="code-block" />
        <Button icon="play" intent="primary" tooltip="Create new release" />
      </td>
    </tr>
  );
};

export default ReleaseDefinitionListItem;

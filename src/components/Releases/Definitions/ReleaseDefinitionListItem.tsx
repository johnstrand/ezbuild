import React from "react";
import { ReleaseDefinition, Approval } from "utils/ApiTypes";
import ReleaseApprove from "../Approval/ReleaseApprove";
import ReleaseDefinitionProcess from "../Process/ReleaseDefinitionProcess";
import ReleaseHistoryList from "../History/ReleaseHistoryList";
import CreateRelease from "../Create/CreateRelease";

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
        {approvals.map(approval => (
          <ReleaseApprove key={approval.id} approvals={[approval]} />
        ))}
      </td>
      <td>
        <ReleaseHistoryList />
        <ReleaseDefinitionProcess />
        <CreateRelease />
      </td>
    </tr>
  );
};

export default ReleaseDefinitionListItem;

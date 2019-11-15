import React, { useState } from "react";
import { Approval } from "utils/ApiTypes";
import Button from "components/Common/Button";

interface Props {
  approvals: Approval[];
}

const ReleaseApprove = (props: Props) => {
  const [visible, setVisible] = useState(false);

  if (props.approvals.length === 0) {
    return null;
  }

  const title =
    props.approvals.length === 1
      ? props.approvals[0].releaseEnvironment.name
      : "Approve multiple";

  const tooltip =
    props.approvals.length === 1
      ? `Approve release to ${props.approvals[0].releaseEnvironment.name}`
      : "Select releases to approve";

  return (
    <>
      <Button text={title} tooltip={tooltip} onClick={() => setVisible(true)} />
    </>
  );
};

export default ReleaseApprove;

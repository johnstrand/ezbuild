import React, { useState } from "react";
import { Approval } from "utils/ApiTypes";
import Button from "components/Common/Button";
import { Dialog } from "@blueprintjs/core";
import {
  DialogHeader,
  DialogBody,
  DialogFooterActions
} from "components/Common/Dialog";

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
      <Dialog
        isOpen={visible}
        onClose={() => setVisible(false)}
        className="bp3-dark large-dialog scroll-dialog"
      >
        <DialogHeader content="Approve release" />
        <DialogBody>Hello world</DialogBody>
        <DialogFooterActions>
          <Button text="Cancel" onClick={() => setVisible(false)} />
          <Button intent="primary" text="Approve" />
        </DialogFooterActions>
      </Dialog>
    </>
  );
};

export default ReleaseApprove;

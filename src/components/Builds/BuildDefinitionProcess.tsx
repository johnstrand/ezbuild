import React, { useState } from "react";
import { Process } from "../../utils/ApiTypes";
import { Button } from "../Common/Button";
import { Dialog } from "@blueprintjs/core";
import { DialogHeader, DialogBody } from "../Common/Dialog";

interface Props {
    process: Process;
}

export const BuildDefinitionProcess = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                tooltip="View build definition"
                icon="code-block"
                onClick={() => setOpen(true)}
            />
            <Dialog
                isOpen={open}
                onClose={() => setOpen(false)}
                className="bp3-dark scroll-dialog large-dialog"
            >
                <DialogHeader content="Build process" />
                <DialogBody>
                    {JSON.stringify(props.process, null, 2)}
                </DialogBody>
            </Dialog>
        </>
    );
};

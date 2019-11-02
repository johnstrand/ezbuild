import React, { useState } from "react";
import { Process } from "utils/ApiTypes";
import { Button } from "components/Common/Button";
import { Dialog } from "@blueprintjs/core";
import { DialogHeader, DialogBody } from "components/Common/Dialog";
import { BuildDefinitionPhase } from "./BuildDefinitionPhase";

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
                    {props.process.yamlFilename && (
                        <div>
                            This pipeline is defined in{" "}
                            {props.process.yamlFilename}
                        </div>
                    )}
                    {props.process.phases &&
                        props.process.phases.map(phase => (
                            <BuildDefinitionPhase
                                key={phase.refName}
                                phase={phase}
                            />
                        ))}
                </DialogBody>
            </Dialog>
        </>
    );
};

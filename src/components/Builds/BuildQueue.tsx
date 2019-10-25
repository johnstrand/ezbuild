import React, { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import { AppToaster } from "../../utils/AppToaster";
import { WithTooltip } from "../../utils/WithTooltip";

export const BuildQueue = () => {
    const [visible, setVisible] = useState(false);

    const prepareQueue = () => {
        setVisible(true);
    };

    const addToQueue = () => {
        AppToaster.show({
            intent: "success",
            message: "Build queued",
            icon: "cog",
            timeout: 5000
        });
        setVisible(false);
    };

    return (
        <>
            <WithTooltip
                text="Queue build"
                element={
                    <Button
                        icon="play"
                        intent="primary"
                        onClick={prepareQueue}
                    />
                }
            />
            <Dialog
                isOpen={visible}
                onClose={() => setVisible(false)}
                className="bp3-dark"
            >
                <div className={Classes.DIALOG_HEADER}>Queue new build</div>
                <div className={Classes.DIALOG_BODY}></div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            intent="primary"
                            text="Queue build"
                            onClick={addToQueue}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

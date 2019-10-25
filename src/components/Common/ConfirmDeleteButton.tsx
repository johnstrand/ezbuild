import React, { useState } from "react";
import { Button, Alert } from "@blueprintjs/core";
import { WithTooltip } from "../../utils/WithTooltip";

interface Props {
    confirmText: string;
    cancelText: string;
    onCancel?: () => void;
    onConfirm: () => void;
}

export const ConfirmDeleteButton = (props: Props) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <WithTooltip
                element={
                    <Button
                        icon="delete"
                        intent="danger"
                        onClick={() => setVisible(true)}
                    />
                }
                text="Delete item"
            />
            <Alert
                isOpen={visible}
                className="bp3-dark"
                cancelButtonText={props.cancelText}
                confirmButtonText={props.confirmText}
                intent="danger"
                onCancel={() => {
                    if (props.onCancel) {
                        props.onCancel();
                    }
                    setVisible(false);
                }}
                onConfirm={async () => {
                    await Promise.resolve(props.onConfirm());
                    setVisible(false);
                }}
            >
                Are you sure that you want to delete? This cannot be undone.
            </Alert>
        </>
    );
};

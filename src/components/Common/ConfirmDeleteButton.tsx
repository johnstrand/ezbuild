import React, { useState } from "react";
import { Alert } from "@blueprintjs/core";
import Button from "./Button";

interface Props {
    confirmText: string;
    cancelText: string;
    onCancel?: () => void;
    onConfirm: () => void;
    tooltip?: string;
}

const ConfirmDeleteButton = (props: Props) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button
                icon="delete"
                intent="danger"
                onClick={() => setVisible(true)}
                tooltip={props.tooltip}
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

export default ConfirmDeleteButton;

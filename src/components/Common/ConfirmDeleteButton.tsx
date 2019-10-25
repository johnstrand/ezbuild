import React, { useState } from "react";
import { Button, Alert } from "@blueprintjs/core";

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
            <Button
                icon="delete"
                intent="danger"
                onClick={() => setVisible(true)}
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

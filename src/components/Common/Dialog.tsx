import React from "react";
import { Classes } from "@blueprintjs/core";

interface Props {
    content: React.ReactNode;
}

interface PropsWithChildren {
    children: React.ReactNode;
}

export const DialogHeader = (props: Props) => {
    return <div className={Classes.DIALOG_HEADER}>{props.content}</div>;
};

export const DialogBody = (props: PropsWithChildren) => {
    return <div className={Classes.DIALOG_BODY}>{props.children}</div>;
};

export const DialogFooterActions = (props: PropsWithChildren) => {
    return (
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                {props.children}
            </div>
        </div>
    );
};

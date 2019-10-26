import React from "react";
import { Button as BPButton, IButtonProps, Tooltip } from "@blueprintjs/core";

export const Button = (
    props: IButtonProps &
        React.HTMLAttributes<HTMLButtonElement> & { tooltip?: string }
) => {
    if (!props.tooltip) {
        return <BPButton {...props}>{props.children}</BPButton>;
    }
    return (
        <Tooltip inheritDarkTheme content={props.tooltip}>
            <BPButton {...props}>{props.children}</BPButton>
        </Tooltip>
    );
};

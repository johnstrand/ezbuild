import React, { ElementType } from "react";
import { Popover, IPopoverProps } from "@blueprintjs/core";

export const WithPopover = (child: JSX.Element) => {
    return (popoverProps: IPopoverProps) => (
        <Popover {...popoverProps}>{child}</Popover>
    );
};

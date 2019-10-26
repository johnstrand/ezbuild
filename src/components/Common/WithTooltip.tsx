import React from "react";
import { Tooltip } from "@blueprintjs/core";

interface Props {
    text: string;
    element: JSX.Element;
}

export const WithTooltip = ({ text, element }: Props) => {
    return (
        <Tooltip inheritDarkTheme content={text}>
            {element}
        </Tooltip>
    );
};

import React from "react";
import { BuildResult } from "../../utils/ApiTypes";
import { Icon, Popover } from "@blueprintjs/core";

interface Props {
    result: BuildResult;
}

export const BuildResultIcon = ({ result }: Props) => {
    const icon =
        result === "failed"
            ? "error"
            : result === "canceled"
            ? "ban-circle"
            : result === "partiallySucceeded"
            ? "tick"
            : result === "succeeded"
            ? "tick"
            : undefined;

    const color =
        result === "succeeded"
            ? "success"
            : result === "partiallySucceeded"
            ? "warning"
            : "danger";

    return (
        <Popover
            content={result}
            interactionKind="hover-target"
            target={<Icon icon={icon} intent={color} />}
        />
    );
};

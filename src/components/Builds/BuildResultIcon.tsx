import React from "react";
import { BuildResult } from "../../utils/ApiTypes";
import { Icon } from "@blueprintjs/core";
import { WithTooltip } from "../Common/WithTooltip";

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
        <WithTooltip
            text={result}
            element={<Icon icon={icon} intent={color} />}
        />
    );
};

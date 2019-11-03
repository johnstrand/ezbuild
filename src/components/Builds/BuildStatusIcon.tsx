import React from "react";
import { BuildResult, BuildStatus } from "utils/ApiTypes";
import { Icon } from "@blueprintjs/core";
import { WithTooltip } from "components/Common/WithTooltip";

interface Props {
    result: BuildResult;
    status: BuildStatus;
}

const BuildStatusIcon = ({ result, status }: Props) => {
    if (status !== "completed") {
        const statusIcon =
            status === "cancelling"
                ? "stop"
                : status === "inProgress"
                ? "play"
                : status === "notStarted"
                ? "time"
                : undefined;

        return (
            <WithTooltip text={status} element={<Icon icon={statusIcon} />} />
        );
    }

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

export default BuildStatusIcon;

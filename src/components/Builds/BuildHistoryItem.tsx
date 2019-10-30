import React from "react";
import { Build } from "../../utils/ApiTypes";
import { useDateFormat } from "../../utils/Utils";
import { BuildStatusIcon } from "./BuildStatusIcon";

export const BuildHistoryItem = ({ item: build }: { item: Build }) => {
    const queueTime = useDateFormat(build.queueTime);
    const finishTime = useDateFormat(build.finishTime);
    return (
        <tr>
            <td>{build.buildNumber}</td>
            <td>
                <BuildStatusIcon result={build.result} status={build.status} />
            </td>
            <td>{queueTime}</td>
            <td>{finishTime}</td>
            <td>{build.sourceBranch}</td>
        </tr>
    );
};

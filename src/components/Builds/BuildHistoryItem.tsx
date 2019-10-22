import React from "react";
import { Build } from "../../utils/ApiTypes";
import { useDateFormat } from "../../utils/Utils";
import { BuildResultIcon } from "./BuildResultIcon";

export const BuildHistoryItem = ({ item: build }: { item: Build }) => {
    const queueTime = useDateFormat(build.queueTime);
    const finishTime = useDateFormat(build.finishTime);
    return (
        <tr>
            <td>{build.buildNumber}</td>
            <td>
                <BuildResultIcon result={build.result} />
            </td>
            <td>{queueTime}</td>
            <td>{finishTime}</td>
            <td>{build.sourceBranch}</td>
        </tr>
    );
};

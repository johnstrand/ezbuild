import React from "react";
import { Spinner } from "@blueprintjs/core";

interface Props {
    visible: boolean;
    columns: number;
    size: number;
}

export const HTMLTableLoadingDataRow = (props: Props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <tr>
            <td colSpan={props.columns} className="cell-center">
                <Spinner size={props.size} />
            </td>
        </tr>
    );
};

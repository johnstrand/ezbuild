import React from "react";
import { NonIdealState } from "@blueprintjs/core";

interface Props {
    visible: boolean;
    columns: number;
    text: string;
}

export const HTMLTableNoDataRow = (props: Props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <tr>
            <td colSpan={props.columns} className="cell-center">
                <NonIdealState description={props.text} />
            </td>
        </tr>
    );
};

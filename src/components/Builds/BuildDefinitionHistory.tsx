import React, { useState } from "react";
import { Button, Dialog, Classes, HTMLTable } from "@blueprintjs/core";
import { useSquawk } from "../../utils/Store";
import { Build } from "../../utils/ApiTypes";
import { BuildHistoryItem } from "./BuildHistoryItem";
import { WithTooltip } from "../../utils/WithTooltip";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";

interface Props {
    id: number;
    name: string;
}

export const BuildDefinitionHistory = (props: Props) => {
    const [visible, setVisible] = useState(false);

    const [list, setList] = useState<Build[]>([]);

    const { buildService, selectedOrg, selectedProject } = useSquawk(
        "buildService",
        "selectedOrg",
        "selectedProject"
    );

    const loadHistory = async () => {
        setVisible(true);
        const history = await buildService.listHistory(
            selectedOrg!,
            selectedProject!,
            props.id
        );
        setList(history);
    };

    return (
        <>
            <WithTooltip
                text="View history"
                element={<Button icon="history" onClick={loadHistory} />}
            />
            <Dialog
                isOpen={visible}
                onClose={() => setVisible(false)}
                className="bp3-dark large-dialog scroll-dialog"
            >
                <div className={Classes.DIALOG_HEADER}>
                    Build history for {props.name}
                </div>
                <div className={Classes.DIALOG_BODY}>
                    <HTMLTable>
                        <HTMLTableSingleHeader>
                            <th>ID</th>
                            <th>Result</th>
                            <th>Queued</th>
                            <th>Completed</th>
                            <th>Branch</th>
                        </HTMLTableSingleHeader>
                        <tbody>
                            <HTMLTableNoDataRow
                                columns={5}
                                visible={list.length === 0}
                                text="Found no previous builds"
                            />
                            {list.map(item => (
                                <BuildHistoryItem key={item.id} item={item} />
                            ))}
                        </tbody>
                    </HTMLTable>
                </div>
            </Dialog>
        </>
    );
};

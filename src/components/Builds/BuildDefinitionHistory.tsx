import React, { useState } from "react";
import { Popover, Button, Dialog, Classes, HTMLTable } from "@blueprintjs/core";
import { useSquawk } from "../../utils/Store";
import { Build } from "../../utils/ApiTypes";
import { BuildHistoryItem } from "./BuildHistoryItem";

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
            <Popover
                content="View history"
                interactionKind="hover"
                target={<Button icon="history" onClick={loadHistory} />}
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
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Result</th>
                                <th>Queued</th>
                                <th>Completed</th>
                                <th>Branch</th>
                            </tr>
                        </thead>
                        <tbody>
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

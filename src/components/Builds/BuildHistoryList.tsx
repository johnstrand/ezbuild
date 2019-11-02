import React, { useState } from "react";
import { Dialog, HTMLTable } from "@blueprintjs/core";
import { useSquawk } from "../../utils/Store";
import { Build } from "../../utils/ApiTypes";
import { BuildHistoryListItem } from "./BuildHistoryListItem";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";
import { HTMLTableLoadingDataRow } from "../Common/HTMLTableLoadingDataRow";
import { Button } from "../Common/Button";
import { DialogHeader, DialogBody } from "../Common/Dialog";

interface Props {
    id: number;
    name: string;
}

export const BuildHistoryList = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [list, setList] = useState<Build[]>([]);

    const { buildService, organizationId, projectId, tenantId } = useSquawk(
        "buildService",
        "organizationId",
        "projectId",
        "tenantId"
    );

    const loadHistory = async () => {
        setVisible(true);
        setLoading(true);
        setList([]);
        const history = await buildService.listHistory(
            tenantId!,
            organizationId!,
            projectId!,
            props.id
        );
        setLoading(false);
        setList(history);
    };

    return (
        <>
            <Button
                tooltip="View history"
                icon="history"
                onClick={loadHistory}
            />
            <Dialog
                isOpen={visible}
                onClose={() => setVisible(false)}
                className="bp3-dark large-dialog scroll-dialog"
            >
                <DialogHeader content={`Build history for ${props.name}`} />
                <DialogBody>
                    <Button
                        icon="refresh"
                        onClick={() => loadHistory()}
                        tooltip="Refresh"
                    />
                    <HTMLTable>
                        <HTMLTableSingleHeader>
                            <th>ID</th>
                            <th>Result</th>
                            <th>Queued</th>
                            <th>Completed</th>
                            <th>Branch</th>
                        </HTMLTableSingleHeader>
                        <tbody>
                            <HTMLTableLoadingDataRow
                                columns={5}
                                visible={loading}
                                size={100}
                            />
                            <HTMLTableNoDataRow
                                columns={5}
                                visible={!loading && list.length === 0}
                                text="Found no previous builds"
                            />
                            {list.map(item => (
                                <BuildHistoryListItem
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </tbody>
                    </HTMLTable>
                </DialogBody>
            </Dialog>
        </>
    );
};

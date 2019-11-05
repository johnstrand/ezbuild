import React, { useState } from "react";
import { Dialog, HTMLTable } from "@blueprintjs/core";
import { useSquawk } from "utils/Store";
import { HIDDEN, VISIBLE } from "utils/ApiTypes";
import BuildHistoryListItem from "./BuildHistoryListItem";
import HTMLTableSingleHeader from "components/Common/Table/HTMLTableSingleHeader";
import HTMLTableNoDataRow from "components/Common/Table/HTMLTableNoDataRow";
import HTMLTableLoadingDataRow from "components/Common/Table/HTMLTableLoadingDataRow";
import Button from "components/Common/Button";
import { DialogHeader, DialogBody } from "components/Common/Dialog";
import { useAsync, AsyncState } from "utils/UseAsync";

interface Props {
    id: number;
    name: string;
}

const BuildHistoryList = (props: Props) => {
    const [visible, setVisible] = useState(HIDDEN);

    const { buildService, organizationId, projectId, tenantId } = useSquawk(
        "buildService",
        "organizationId",
        "projectId",
        "tenantId"
    );

    const [history, state, listHistory] = useAsync(
        buildService.listHistory,
        []
    );

    const loading = state === AsyncState.Pending;

    const loadHistory = async () => {
        setVisible(VISIBLE);
        listHistory(tenantId!, organizationId!, projectId!, props.id);
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
                        onClick={loadHistory}
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
                                visible={!loading && history.length === 0}
                                text="Found no previous builds"
                            />
                            {history.map(item => (
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

export default BuildHistoryList;

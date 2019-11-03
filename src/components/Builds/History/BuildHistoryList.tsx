import React, { useState } from "react";
import { Dialog, HTMLTable } from "@blueprintjs/core";
import { useSquawk } from "utils/Store";
import {
    Build,
    HIDDEN,
    LOADING_COMPLETE,
    VISIBLE,
    LOADING
} from "utils/ApiTypes";
import BuildHistoryListItem from "./BuildHistoryListItem";
import HTMLTableSingleHeader from "components/Common/Table/HTMLTableSingleHeader";
import HTMLTableNoDataRow from "components/Common/Table/HTMLTableNoDataRow";
import HTMLTableLoadingDataRow from "components/Common/Table/HTMLTableLoadingDataRow";
import Button from "components/Common/Button";
import { DialogHeader, DialogBody } from "components/Common/Dialog";

interface Props {
    id: number;
    name: string;
}

const BuildHistoryList = (props: Props) => {
    const [visible, setVisible] = useState(HIDDEN);
    const [loading, setLoading] = useState(LOADING_COMPLETE);

    const [list, setList] = useState<Build[]>([]);

    const { buildService, organizationId, projectId, tenantId } = useSquawk(
        "buildService",
        "organizationId",
        "projectId",
        "tenantId"
    );

    const loadHistory = async () => {
        setVisible(VISIBLE);
        setLoading(LOADING);
        setList([]);
        const history = await buildService.listHistory(
            tenantId!,
            organizationId!,
            projectId!,
            props.id
        );
        setLoading(LOADING_COMPLETE);
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

export default BuildHistoryList;

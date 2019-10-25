import React, { useState } from "react";
import { Dialog, Classes, Button, HTMLTable, Popover } from "@blueprintjs/core";
import { AddToken } from "./AddToken";
import { useSquawk } from "../../utils/Store";
import { ConfirmDeleteButton } from "../Common/ConfirmDeleteButton";
import { deleteOrganization } from "../../utils/Actions";
import { AppToaster } from "../../utils/AppToaster";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";

export const TokenList = () => {
    const { orgs } = useSquawk("orgs");
    const hasOrgs = !!Object.keys(orgs).length;
    const [visible, setVisible] = useState(!hasOrgs);
    return (
        <>
            <Popover
                target={
                    <Button icon="settings" onClick={() => setVisible(true)} />
                }
                interactionKind="hover-target"
                inheritDarkTheme
                content="Administer
            access tokens"
            />
            <Dialog
                isOpen={visible || !hasOrgs}
                className="bp3-dark large-dialog"
                canEscapeKeyClose={false}
                canOutsideClickClose={false}
            >
                <div className={Classes.DIALOG_HEADER}>
                    Azure Devops Organizations
                </div>
                <div className={Classes.DIALOG_BODY}>
                    <HTMLTable bordered striped interactive>
                        <HTMLTableSingleHeader>
                            <th>Name</th>
                            <th>Alias</th>
                            <th className="header-right header-5">
                                <AddToken />
                            </th>
                        </HTMLTableSingleHeader>
                        <tbody>
                            <HTMLTableNoDataRow
                                visible={!hasOrgs}
                                columns={3}
                                text="No Azure Devops Organizations registered"
                            />
                            {Object.keys(orgs).map(k => (
                                <tr key={k}>
                                    <td>{orgs[k].name}</td>
                                    <td>{orgs[k].alias}</td>
                                    <td className="cell-right">
                                        <ConfirmDeleteButton
                                            confirmText="Delete"
                                            cancelText="Cancel"
                                            onConfirm={() => {
                                                deleteOrganization(k);
                                                AppToaster.show({
                                                    intent: "danger",
                                                    message:
                                                        "Organization deleted",
                                                    timeout: 5000
                                                });
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </HTMLTable>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            text="Close"
                            disabled={!hasOrgs}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

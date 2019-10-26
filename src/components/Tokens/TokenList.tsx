import React, { useState } from "react";
import { Dialog, Classes, HTMLTable } from "@blueprintjs/core";
import { AddToken } from "./AddToken";
import { useSquawk } from "../../utils/Store";
import { HTMLTableSingleHeader } from "../Common/HTMLTableSingleHeader";
import { HTMLTableNoDataRow } from "../Common/HTMLTableNoDataRow";
import { TokenListItem } from "./TokenListItem";
import { Button } from "../Common/Button";

export const TokenList = () => {
    const { orgs } = useSquawk("orgs");
    const hasOrgs = Object.keys(orgs).length > 0;
    const [visible, setVisible] = useState(!hasOrgs);
    return (
        <>
            <Button
                icon="settings"
                onClick={() => setVisible(true)}
                tooltip="Administer tokens"
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
                            {Object.keys(orgs).map(key => (
                                <TokenListItem key={key} org={orgs[key]} />
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

import React, { useState } from "react";
import {
    Dialog,
    Classes,
    Button,
    HTMLTable,
    NonIdealState,
    Popover
} from "@blueprintjs/core";
import { AddToken } from "./AddToken";
import { useSquawk } from "../../utils/Store";

export const Tokens = () => {
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
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Alias</th>
                                <th className="header-right header-5">
                                    <AddToken />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!hasOrgs && (
                                <tr>
                                    <td colSpan={3}>
                                        <NonIdealState description="No Azure Devops Organizations registered" />
                                    </td>
                                </tr>
                            )}
                            {Object.keys(orgs).map(k => (
                                <tr key={k}>
                                    <td>{orgs[k].name}</td>
                                    <td>{orgs[k].alias}</td>
                                    <td>
                                        <Button icon="delete" intent="danger" />
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

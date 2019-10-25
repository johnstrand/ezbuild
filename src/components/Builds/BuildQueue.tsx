import React, { useState } from "react";
import {
    Button,
    Dialog,
    Classes,
    FormGroup,
    HTMLSelect
} from "@blueprintjs/core";
import { AppToaster } from "../../utils/AppToaster";
import { WithTooltip } from "../../utils/WithTooltip";
import { Repository, Branch } from "../../utils/ApiTypes";
import { useSquawk } from "../../utils/Store";

interface Props {
    id: number;
    name: string;
    repository: Repository;
}

const sort = (a: Branch, b: Branch) => {
    return (
        (a.isBaseVersion ? -1 : 1) - (b.isBaseVersion ? -1 : 1) ||
        new Date(b.commit.committer.date).valueOf() -
            new Date(a.commit.committer.date).valueOf()
    );
};

export const BuildQueue = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [branches, setBranches] = useState<Branch[]>([]);
    const { repositoryService, selectedOrg, selectedProject } = useSquawk(
        "repositoryService",
        "selectedOrg",
        "selectedProject"
    );

    const prepareQueue = async () => {
        setVisible(true);
        setBranches(
            (await repositoryService.listBranches(
                selectedOrg!,
                selectedProject!,
                props.repository.id
            )).sort(sort)
        );
    };

    const addToQueue = () => {
        AppToaster.show({
            intent: "success",
            message: "Build queued",
            icon: "cog",
            timeout: 5000
        });
        setVisible(false);
    };

    return (
        <>
            <WithTooltip
                text={`Queue build for ${props.name}`}
                element={
                    <Button
                        icon="play"
                        intent="primary"
                        onClick={prepareQueue}
                    />
                }
            />
            <Dialog
                isOpen={visible}
                onClose={() => setVisible(false)}
                className="bp3-dark"
            >
                <div className={Classes.DIALOG_HEADER}>
                    Queue new build for {props.name}
                </div>
                <div className={Classes.DIALOG_BODY}>
                    <FormGroup label="Branch" labelFor="branches">
                        <HTMLSelect id="branches" fill>
                            {branches.map(branch => (
                                <option key={branch.name}>{branch.name}</option>
                            ))}
                        </HTMLSelect>
                    </FormGroup>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            intent="primary"
                            text="Queue build"
                            onClick={addToQueue}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

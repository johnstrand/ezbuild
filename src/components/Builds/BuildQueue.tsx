import React, { useState } from "react";
import {
    Button,
    Dialog,
    Classes,
    FormGroup,
    HTMLSelect,
    InputGroup,
    Spinner
} from "@blueprintjs/core";
import { AppToaster } from "../../utils/AppToaster";
import { WithTooltip } from "../../utils/WithTooltip";
import { Repository, Branch, Variables } from "../../utils/ApiTypes";
import { useSquawk } from "../../utils/Store";
import {
    DialogFooterActions,
    DialogHeader,
    DialogBody
} from "../Common/Dialog";

interface Props {
    id: number;
    name: string;
    repository: Repository;
    variables: Variables;
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
    const [loading, setLoading] = useState(true);
    const { repositoryService, selectedOrg, selectedProject } = useSquawk(
        "repositoryService",
        "selectedOrg",
        "selectedProject"
    );

    const prepareQueue = async () => {
        setVisible(true);
        setLoading(true);
        setBranches(
            (
                (await repositoryService.listBranches(
                    selectedOrg!,
                    selectedProject!,
                    props.repository.id
                )) || []
            ).sort(sort)
        );
        setLoading(false);

        // TODO: Copy variables into local state and make editable
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
                <DialogHeader content={`Queue new build for ${props.name}`} />
                <DialogBody>
                    {loading && <Spinner size={Spinner.SIZE_LARGE} />}
                    <FormGroup label="Branch" labelFor="branches">
                        <HTMLSelect id="branches" fill>
                            {branches.map(branch => (
                                <option key={branch.name}>
                                    {branch.name} ({branch.aheadCount} ahead,{" "}
                                    {branch.behindCount} behind)
                                </option>
                            ))}
                        </HTMLSelect>
                    </FormGroup>
                    {Object.keys(props.variables || {}).map(key => (
                        <FormGroup
                            key={key}
                            label={key}
                            labelFor={`var_${key}`}
                        >
                            <InputGroup
                                id={`var_${key}`}
                                data-lpignore="true"
                                autoComplete="off"
                                readOnly={!props.variables[key].allowOverride}
                                value={props.variables[key].value}
                            />
                        </FormGroup>
                    ))}
                </DialogBody>
                <DialogFooterActions>
                    <Button text="Cancel" onClick={() => setVisible(false)} />
                    <Button
                        disabled={branches.length === 0}
                        intent="primary"
                        text="Queue build"
                        onClick={addToQueue}
                    />
                </DialogFooterActions>
            </Dialog>
        </>
    );
};

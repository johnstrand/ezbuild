import React, { useState } from "react";
import {
    Dialog,
    FormGroup,
    HTMLSelect,
    InputGroup,
    Spinner
} from "@blueprintjs/core";
import { showToast } from "../../utils/AppToaster";
import { Repository, Branch, Variables, Queue } from "../../utils/ApiTypes";
import { useSquawk } from "../../utils/Store";
import {
    DialogFooterActions,
    DialogHeader,
    DialogBody
} from "../Common/Dialog";
import { branchCompare } from "../../utils/Comparers";
import { convertVariables } from "../../utils/Utils";
import { HideableNonIdealState, HideableFormGroup } from "../Common/Hidable";
import { Button } from "../Common/Button";

interface Props {
    id: number;
    name: string;
    queue: Queue;
    repository: Repository;
    variables: Variables;
}

export const BuildQueue = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [branch, setBranch] = useState("");
    const [loading, setLoading] = useState(true);
    const {
        repositoryService,
        buildService,
        selectedOrg,
        selectedProject,
        projects
    } = useSquawk(
        "repositoryService",
        "buildService",
        "selectedOrg",
        "selectedProject",
        "projects"
    );

    const prepareQueue = async () => {
        setVisible(true);
        setLoading(true);
        const b = (
            (await repositoryService.listBranches(
                selectedOrg!,
                selectedProject!,
                props.repository.id
            )) || []
        ).sort(branchCompare);
        setBranches(b);
        if (b.length > 0) {
            setBranch(b[0].name);
        }
        setLoading(false);

        // TODO: Copy variables into local state and make editable
    };

    const addToQueue = async () => {
        const projectId = projects.find(p => p.name === selectedProject)!.id;
        const request = {
            queue: {
                id: props.queue.id
            },
            definition: {
                id: props.id
            },
            project: {
                id: projectId!
            },
            sourceBranch: `refs/heads/${branch}`,
            sourceVersion: "",
            reason: 1,
            demands: [],
            parameters: JSON.stringify(convertVariables(props.variables))
        };
        await buildService.trigger(selectedOrg!, request);
        showToast("Build queued", "success", "cog");
        setVisible(false);
    };

    return (
        <>
            <Button
                icon="play"
                intent="primary"
                onClick={prepareQueue}
                tooltip={`Queue build for ${props.name}`}
            />
            <Dialog
                isOpen={visible}
                onClose={() => setVisible(false)}
                className="bp3-dark"
            >
                <DialogHeader content={`Queue new build for ${props.name}`} />
                <DialogBody>
                    {loading && <Spinner size={Spinner.SIZE_LARGE} />}
                    <HideableNonIdealState
                        hidden={loading || branches.length > 0}
                        title="No branches found"
                    />
                    <HideableFormGroup
                        label="Branch"
                        labelFor="branches"
                        hidden={loading || branches.length === 0}
                    >
                        <HTMLSelect
                            id="branches"
                            fill
                            onChange={({ currentTarget: { value } }) =>
                                setBranch(value)
                            }
                        >
                            {branches.map(branch => (
                                <option key={branch.name} value={branch.name}>
                                    {branch.name} ({branch.aheadCount} ahead,{" "}
                                    {branch.behindCount} behind)
                                </option>
                            ))}
                        </HTMLSelect>
                    </HideableFormGroup>
                    {!loading &&
                        branches.length > 0 &&
                        Object.keys(props.variables || {}).map(key => (
                            <FormGroup
                                key={key}
                                label={key}
                                labelFor={`var_${key}`}
                            >
                                <InputGroup
                                    id={`var_${key}`}
                                    data-lpignore="true"
                                    autoComplete="off"
                                    readOnly={true} // Should actually check if override is allowed
                                    value={props.variables[key].value}
                                    onChange={() => {}} // Read-only for now
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

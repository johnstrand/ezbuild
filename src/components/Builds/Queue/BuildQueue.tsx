import React, { useReducer } from "react";
import { Dialog, Spinner } from "@blueprintjs/core";
import showToast from "utils/AppToaster";
import { Repository, Variables, Queue } from "utils/ApiTypes";
import { useSquawk } from "utils/Store";
import {
    DialogFooterActions,
    DialogHeader,
    DialogBody
} from "components/Common/Dialog";
import { branchCompare } from "utils/Comparers";
import { convertVariables } from "utils/Utils";
import {
    HideableNonIdealState,
    HideableSpinner
} from "components/Common/Hideable";
import Button from "components/Common/Button";
import buildQueueReducer from "./BuildQueue.state";
import SelectBranch from "./SelectBranch";
import BuildVariableList from "./BuildVariableList";

interface Props {
    id: number;
    name: string;
    queue: Queue;
    repository: Repository;
    variables: Variables;
}

// TODO: Refactor this

const BuildQueue = (props: Props) => {
    const [{ branch, branches, loading, visible }, dispatch] = useReducer(
        buildQueueReducer,
        {
            visible: false,
            branches: [],
            branch: "",
            loading: false
        }
    );

    const {
        repositoryService,
        buildService,
        tenantId,
        organizationId,
        projectId
    } = useSquawk(
        "repositoryService",
        "buildService",
        "organizationId",
        "projectId",
        "tenantId"
    );

    const prepareQueue = async () => {
        dispatch({ visible: true, loading: true });
        const b = (
            (await repositoryService.listBranches(
                tenantId!,
                organizationId!,
                projectId!,
                props.repository.id
            )) || []
        ).sort(branchCompare);
        dispatch({
            branches: b,
            loading: false,
            branch: b.length > 0 ? b[0].name : ""
        });

        // TODO: Copy variables into local state and make editable
    };

    // Move this method someplace else
    const addToQueue = async () => {
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
            sourceBranch: `refs/heads/${branch}`, // See if we can't improve on this
            sourceVersion: "",
            reason: 1,
            demands: [],
            parameters: JSON.stringify(convertVariables(props.variables))
        };
        await buildService.trigger(tenantId!, organizationId!, request);
        showToast("Build queued", "success", "cog");
        dispatch({ visible: false });
    };

    const disabled = props.repository.type !== "TfsGit";

    return (
        <>
            {/* Tooltips are broken on disabled buttons, find a workaround */}
            <Button
                icon="play"
                intent="primary"
                onClick={prepareQueue}
                tooltip={
                    disabled
                        ? `Builds are not supported for repository type ${props.repository.type}`
                        : `Queue build for ${props.name}`
                }
                disabled={disabled}
            />
            <Dialog
                isOpen={visible}
                onClose={() => dispatch({ visible: false })}
                className="bp3-dark"
            >
                <DialogHeader content={`Queue new build for ${props.name}`} />
                <DialogBody>
                    <HideableSpinner
                        size={Spinner.SIZE_LARGE}
                        hidden={!loading}
                    />
                    <HideableNonIdealState
                        hidden={loading || branches.length > 0}
                        title="No branches found"
                    />
                    <SelectBranch
                        loading={loading}
                        branches={branches}
                        onChange={value => dispatch({ branch: value })}
                    />
                    <BuildVariableList
                        variables={props.variables}
                        visible={!loading && branches.length > 0}
                    />
                </DialogBody>
                <DialogFooterActions>
                    <Button
                        text="Cancel"
                        onClick={() => dispatch({ visible: false })}
                    />
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

export default BuildQueue;

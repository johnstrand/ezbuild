import React from "react";
import { Branch } from "utils/ApiTypes";
import { HideableFormGroup } from "components/Common/Hideable";
import { HTMLSelect } from "@blueprintjs/core";

interface Props {
    loading: boolean;
    branches: Branch[];
    onChange: (value: string) => void;
}

const SelectBranch = ({ loading, branches, onChange }: Props) => {
    return (
        <HideableFormGroup
            label="Branch"
            labelFor="branches"
            hidden={loading || branches.length === 0}
        >
            <HTMLSelect
                id="branches"
                fill
                onChange={({ currentTarget: { value } }) => onChange(value)}
            >
                {branches.map(branch => (
                    <option key={branch.name} value={branch.name}>
                        {branch.name} ({branch.aheadCount} ahead,{" "}
                        {branch.behindCount} behind)
                    </option>
                ))}
            </HTMLSelect>
        </HideableFormGroup>
    );
};

export default SelectBranch;

import React from "react";
import { useSquawk } from "../../utils/Store";
import { listBuildDefinitions } from "../../utils/Actions";

export const SelectProject = () => {
    const { projects, selectedOrg } = useSquawk("projects", "selectedOrg");
    //const loading = usePending("projects");

    const selectProject = (project: string) => {
        listBuildDefinitions({ settings: selectedOrg!, project });
    };

    return (
        <div className="bp3-select">
            <select onChange={ev => selectProject(ev.currentTarget.value)}>
                {projects.map(p => (
                    <option key={p.id} value={p.name}>
                        {p.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

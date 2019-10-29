import React from "react";
import { useSquawk } from "../../utils/Store";
import {
    listBuildDefinitions,
    listReleaseDefinitions
} from "../../utils/Actions";

export const SelectProject = () => {
    const { projects, tenantId, organizationId } = useSquawk(
        "projects",
        "tenantId",
        "organizationId"
    );
    //const loading = usePending("projects");

    const selectProject = (project: string) => {
        /*listBuildDefinitions({ tenantId: selectedOrg!, project });
        listReleaseDefinitions({ tenantId: selectedOrg!, project });*/
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

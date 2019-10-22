import React from "react";
import { useSquawk } from "../../utils/Store";
import { listProjects } from "../../utils/Actions";

export const SelectOrganization = () => {
    const { orgs } = useSquawk("orgs");

    const selectOrg = (id: string) => {
        const org = orgs[id];
        listProjects(org);
    };

    return (
        <div className="bp3-select">
            <select onChange={ev => selectOrg(ev.currentTarget.value)}>
                {Object.keys(orgs).map(k => (
                    <option key={k} value={k}>
                        {orgs[k].alias}
                    </option>
                ))}
            </select>
        </div>
    );
};

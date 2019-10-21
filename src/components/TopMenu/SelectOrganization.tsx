import React from "react";
import { useSquawk } from "../../utils/Store";

export const SelectOrganization = () => {
    const { orgs } = useSquawk("orgs");
    return (
        <div className="bp3-select">
            <select>
                {Object.keys(orgs).map(k => (
                    <option key={k}>{orgs[k].alias}</option>
                ))}
            </select>
        </div>
    );
};

import React from "react";
import { useSquawk, usePending } from "../../utils/Store";

export const SelectProject = () => {
    const { projects } = useSquawk("projects");
    const loading = usePending("projects");

    return (
        <div className="bp3-select">
            <select>
                {projects.map(p => (
                    <option key={p.id}>{p.name}</option>
                ))}
            </select>
        </div>
    );
};

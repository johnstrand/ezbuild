import React from "react";
import { useSquawk, usePending } from "../../utils/Store";
import {
    listBuildDefinitions,
    listReleaseDefinitions
} from "../../utils/Actions";
import { Dropdown } from "../Common/Dropdown";

export const SelectProject = () => {
    const { projects, tenantId, organizationId } = useSquawk(
        "projects",
        "tenantId",
        "organizationId"
    );
    const loading = usePending("projects");

    const selectProject = (project: string) => {
        listBuildDefinitions({
            tenantId: tenantId!,
            organizationId: organizationId!,
            project
        });
        listReleaseDefinitions({
            tenantId: tenantId!,
            organizationId: organizationId!,
            project
        });
    };

    const items = projects.map(p => ({
        key: p.id,
        value: p.id,
        text: p.name
    }));

    return (
        <Dropdown<string>
            items={items}
            onChange={selectProject}
            loading={loading}
            noData="No projects found"
        />
    );
};

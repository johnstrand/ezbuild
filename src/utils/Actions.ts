import { action, pending } from "utils/Store";
import { getTenants, getAccount } from "utils/Auth";
import { AzureTenant } from "utils/ApiTypes";
import showToast from "utils/AppToaster";
import {
    tenantCompare,
    organizationCompare,
    projectCompare
} from "./Comparers";
import getNavSelection from "./NavSelection";

export const addTenantFilter = action<AzureTenant>((state, tenant) => {
    if (state.tenantFilter.some(t => t.tenantId === tenant.tenantId)) {
        showToast(
            "That tenant was already filtered, sorry about that",
            "warning"
        );
        return [];
    }

    showToast(
        "Filter added, please reload page if the filter fails to apply",
        "success"
    );
    const tenantFilter = [...state.tenantFilter, tenant];

    localStorage.setItem("tenantFilter", JSON.stringify(tenantFilter));

    return [{ tenantFilter }, listTenants];
});

export const listTenants = action(async state => {
    pending(["tenants", "organizations", "projects", "buildDefinitions"], true);
    const tenants = (await getTenants())
        .filter(t => !state.tenantFilter.some(f => f.tenantId === t.tenantId))
        .sort(tenantCompare);

    pending(
        ["tenants", "organizations", "projects", "buildDefinitions"],
        false
    );

    const { tenantId } = getNavSelection();

    const selectedTenantId =
        tenants.length > 0
            ? tenants.some(t => t.tenantId === tenantId)
                ? tenantId
                : tenants[0].tenantId
            : null;

    return [
        {
            tenants,
            account: getAccount(),
            tenantId: selectedTenantId
        },
        () => selectedTenantId && listOrganizations(selectedTenantId)
    ];
});

export const listOrganizations = action<string>(async (state, tenantId) => {
    pending(["organizations", "projects", "buildDefinitions"], true);
    const profile = await state.profileService.get(tenantId);
    const organizations = (await state.accountService.listAccounts(
        tenantId,
        profile.id
    )).sort(organizationCompare);

    const { organizationId } = getNavSelection();

    const selectedOrganizationId =
        organizations.length > 0
            ? organizations.some(o => o.accountName === organizationId)
                ? organizationId
                : organizations[0].accountName
            : null;

    pending(["organizations", "projects", "buildDefinitions"], false);
    return [
        {
            organizations,
            tenantId,
            organizationId: selectedOrganizationId
        },
        () =>
            selectedOrganizationId &&
            listProjects({ tenantId, organizationId: selectedOrganizationId })
    ];
});

export const listProjects = action<{
    tenantId: string;
    organizationId: string;
}>(async ({ projectService }, { tenantId, organizationId }) => {
    pending(["projects", "buildDefinitions"], true);
    try {
        const projects = (await projectService.list(
            tenantId,
            organizationId
        )).sort(projectCompare);

        const { projectId, page } = getNavSelection();

        const selectedProjectId =
            projects.length > 0
                ? projects.some(p => p.id === projectId)
                    ? projectId
                    : projects[0].id
                : null;

        return [
            {
                tenantId,
                projects,
                organizationId,
                projectId: selectedProjectId
            },
            () => {
                if (selectedProjectId) {
                    window.location.hash = [
                        tenantId,
                        organizationId,
                        selectedProjectId,
                        page
                    ].join("/");
                    listBuildDefinitions({
                        tenantId,
                        organizationId,
                        project: selectedProjectId
                    });
                    listReleaseDefinitions({
                        tenantId,
                        organizationId,
                        project: selectedProjectId
                    });
                }
            }
        ];
    } catch {
    } finally {
        pending(["projects", "buildDefinitions"], false);
    }
    return [];
});

export const listReleaseDefinitions = action<{
    tenantId: string;
    organizationId: string;
    project: string;
}>(async ({ releaseService }, { tenantId, organizationId, project }) => {
    const { page } = getNavSelection();
    window.location.hash = [tenantId, organizationId, project, page].join("/");
    await releaseService.listDefinitions(tenantId, organizationId, project);
    return [];
});

export const listBuildDefinitions = action<{
    tenantId: string;
    organizationId: string;
    project: string;
}>(async ({ buildService }, { tenantId, organizationId, project }) => {
    const { page } = getNavSelection();
    window.location.hash = [tenantId, organizationId, project, page].join("/");
    pending(["buildDefinitions"], true);
    const buildDefinitions = await buildService.listDefinitions(
        tenantId,
        organizationId,
        project
    );
    pending(["buildDefinitions"], false);
    return [{ buildDefinitions, projectId: project }];
});

if (getAccount()) {
    listTenants();
}

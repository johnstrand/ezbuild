import { action, pending } from "./Store";
import { getTenants, getAccount } from "./Auth";
import { AzureTenant } from "./ApiTypes";
import { showToast } from "./AppToaster";

export const addTenantFilter = action<AzureTenant>((state, tenant) => {
    if (state.tenantFilter.some(t => t.tenantId === tenant.tenantId)) {
        showToast(
            "That tenant was already filtered, sorry about that",
            "warning"
        );
        return {};
    }

    showToast("Filter added, please reload page to apply", "success");
    const tenantFilter = [...state.tenantFilter, tenant];

    localStorage.setItem("tenantFilter", JSON.stringify(tenantFilter));

    return { tenantFilter };
});

export const listTenants = action(async state => {
    pending(["tenants", "organizations", "projects", "buildDefinitions"], true);
    const tenants = (await getTenants()).filter(
        t => !state.tenantFilter.some(f => f.tenantId === t.tenantId)
    );
    if (tenants.length > 0) {
        listOrganizations(tenants[0].tenantId);
    }
    pending(
        ["tenants", "organizations", "projects", "buildDefinitions"],
        false
    );
    return {
        tenants,
        account: getAccount(),
        tenantId: tenants.length > 0 ? tenants[0].tenantId : null
    };
});

export const listOrganizations = action<string>(async (state, tenantId) => {
    pending(["organizations", "projects", "buildDefinitions"], true);
    const profile = await state.profileService.get(tenantId);
    const organizations = await state.accountService.listAccounts(
        tenantId,
        profile.id
    );
    if (organizations.length > 0) {
        listProjects({
            tenantId,
            organizationId: organizations[0].accountName
        });
    }
    pending(["organizations", "projects", "buildDefinitions"], false);
    return {
        organizations,
        tenantId,
        organizationId:
            organizations.length > 0 ? organizations[0].accountName : null
    };
});

export const listProjects = action<{
    tenantId: string;
    organizationId: string;
}>(async ({ projectService }, { tenantId, organizationId }) => {
    pending(["projects", "buildDefinitions"], true);
    try {
        const projects = await projectService.list(tenantId, organizationId);
        if (projects.length) {
            listBuildDefinitions({
                tenantId,
                organizationId,
                project: projects[0].name
            });
            listReleaseDefinitions({
                tenantId,
                organizationId,
                project: projects[0].name
            });
        }
        return {
            tenantId,
            projects,
            organizationId,
            selectedProject: projects[0].name
        };
    } catch {
    } finally {
        pending(["projects", "buildDefinitions"], false);
    }
    return {};
});

export const listReleaseDefinitions = action<{
    tenantId: string;
    organizationId: string;
    project: string;
}>(async ({ releaseService }, { tenantId, organizationId, project }) => {
    await releaseService.listDefinitions(tenantId, organizationId, project);
    return {};
});

export const listBuildDefinitions = action<{
    tenantId: string;
    organizationId: string;
    project: string;
}>(async ({ buildService }, { tenantId, organizationId, project }) => {
    pending(["buildDefinitions"], true);
    const buildDefinitions = await buildService.listDefinitions(
        tenantId,
        organizationId,
        project
    );
    pending(["buildDefinitions"], false);
    return { buildDefinitions, projectId: project };
});

if (getAccount()) {
    listTenants();
}

import { mutableAction, pending } from "utils/Store";
import { getTenants, getAccount } from "utils/Auth";
import { AzureTenant } from "utils/ApiTypes";
import showToast from "utils/AppToaster";
import {
  tenantCompare,
  organizationCompare,
  projectCompare
} from "./Comparers";
import getNavSelection from "./NavSelection";

export const addTenantFilter = mutableAction<AzureTenant>((state, tenant) => {
  if (state.tenantFilter.some(t => t.tenantId === tenant.tenantId)) {
    showToast("That tenant was already filtered, sorry about that", "warning");
    return;
  }

  showToast(
    "Filter added, please reload page if the filter fails to apply",
    "success"
  );

  state.tenantFilter.push(tenant);

  localStorage.setItem("tenantFilter", JSON.stringify(state.tenantFilter));
});

export const listTenants = mutableAction(async state => {
  pending(["tenants", "organizations", "projects"], true);

  state.account = getAccount();

  state.tenants = (await getTenants())
    .filter(t => !state.tenantFilter.some(f => f.tenantId === t.tenantId))
    .sort(tenantCompare);

  pending(["tenants", "organizations", "projects"], false);

  const { tenantId } = getNavSelection();

  state.tenantId =
    state.tenants.length > 0
      ? state.tenants.some(t => t.tenantId === tenantId)
        ? tenantId
        : state.tenants[0].tenantId
      : null;
});

export const selectTenant = mutableAction<string>((state, tenantId) => {
  state.tenantId = tenantId;
});

export const listOrganizations = mutableAction<string>(
  async (state, tenantId) => {
    pending(["organizations", "projects"], true);
    state.tenantId = tenantId;
    const profile = await state.profileService.get(tenantId);
    state.organizations = (
      await state.accountService.listAccounts(tenantId, profile.id)
    ).sort(organizationCompare);

    const { organizationId } = getNavSelection();

    state.organizationId =
      state.organizations.length > 0
        ? state.organizations.some(o => o.accountName === organizationId)
          ? organizationId
          : state.organizations[0].accountName
        : null;

    pending(["organizations", "projects"], false);
  }
);

export const selectOrganization = mutableAction<string>(
  (state, organisationId) => {
    state.organizationId = organisationId;
  }
);

export const listProjects = mutableAction<{
  tenantId: string;
  organizationId: string;
}>(async (state, { tenantId, organizationId }) => {
  pending(["projects"], true);
  try {
    state.projects = (
      await state.projectService.list(tenantId, organizationId)
    ).sort(projectCompare);

    state.tenantId = tenantId;
    state.organizationId = organizationId;

    const { projectId } = getNavSelection();

    state.projectId =
      state.projects.length > 0
        ? state.projects.some(p => p.id === projectId)
          ? projectId
          : state.projects[0].id
        : null;
  } catch {
  } finally {
    pending(["projects"], false);
  }
});

export const selectProject = mutableAction<string>((state, projectId) => {
  state.projectId = projectId;
});

(async () => {
  if (getAccount()) {
    const { tenantId } = await listTenants();
    if (!tenantId) {
      return;
    }
    const { organizationId } = await listOrganizations(tenantId);
    if (!organizationId) {
      return;
    }

    await listProjects({ tenantId, organizationId });
  }
})();

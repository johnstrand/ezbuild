import React, { useState, useEffect } from "react";
import { usePending, useSquawk } from "utils/Store";
import { Dialog, Button } from "@blueprintjs/core";
import {
    DialogHeader,
    DialogBody,
    DialogFooterActions
} from "components/Common/Dialog";
import { addTenantFilter } from "utils/Actions";

const SuggestAddFilter = () => {
    const loading = {
        organizations: usePending("organizations"),
        projects: usePending("projects")
    };
    const { organizations, tenantId, tenants } = useSquawk(
        "organizations",
        "tenantId",
        "tenants"
    );

    const [open, setOpen] = useState(false);

    const tenant = tenants.find(t => t.tenantId === tenantId);

    useEffect(() => {
        setOpen(
            !loading.organizations &&
                !loading.projects &&
                organizations.length === 0
        );
    }, [loading.organizations, loading.projects, organizations]);

    if (!tenant) {
        return null;
    }

    const setFilter = () => {
        addTenantFilter(tenant);
        setOpen(false);
    };

    return (
        <Dialog isOpen={open} className="bp3-dark">
            <DialogHeader content="Filter current tenant?" />
            <DialogBody>
                The tenant "{tenant.displayName}" does not appear to have any
                Azure DevOps organizations, would you like to add a filter to
                remove it?
            </DialogBody>
            <DialogFooterActions>
                <Button text="Cancel" onClick={() => setOpen(false)} />
                <Button text="Ok" intent="primary" onClick={setFilter} />
            </DialogFooterActions>
        </Dialog>
    );
};

export default SuggestAddFilter;

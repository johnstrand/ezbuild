import React, { useState, useEffect } from "react";
import { usePending, useSquawk } from "../../utils/Store";
import { Dialog, Button } from "@blueprintjs/core";
import {
    DialogHeader,
    DialogBody,
    DialogFooterActions
} from "../Common/Dialog";

export const SuggestAddFilter = () => {
    const loading = usePending("organizations");
    const { organizations, tenantId } = useSquawk("organizations", "tenantId");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(!loading && organizations.length === 0);
    }, [loading, organizations]);

    return (
        <Dialog isOpen={open} className="bp3-dark">
            <DialogHeader content="Filter current tenant?" />
            <DialogBody>
                The tenant {tenantId} does not appear to have any Azure DevOps
                organizations, would you like to add a filter to remove it?
            </DialogBody>
            <DialogFooterActions>
                <Button text="Cancel" onClick={() => setOpen(false)} />
                <Button text="Ok" />
            </DialogFooterActions>
        </Dialog>
    );
};

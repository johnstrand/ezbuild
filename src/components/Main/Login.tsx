import React from "react";
import { Dialog, Button, Spinner } from "@blueprintjs/core";
import { DialogHeader, DialogBody } from "../Common/Dialog";
import { listTenants } from "../../utils/Actions";
import { usePending } from "../../utils/Store";

export const Login = () => {
    const loading = usePending("tenants");
    const handleLogin = () => {
        listTenants();
    };
    return (
        <div className="bp3-dark app-root">
            <Dialog isOpen className="bp3-dark">
                <DialogHeader content="Please log in" />
                <DialogBody>
                    {loading && <Spinner size={Spinner.SIZE_LARGE} />}
                    <Button
                        icon="log-in"
                        text="Click here to sign in to your Microsoft Account"
                        onClick={handleLogin}
                        disabled={loading}
                    />
                </DialogBody>
            </Dialog>
        </div>
    );
};

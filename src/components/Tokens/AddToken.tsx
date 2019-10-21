import React, { useState, useReducer, useEffect } from "react";
import {
    Button,
    Dialog,
    Classes,
    FormGroup,
    InputGroup
} from "@blueprintjs/core";
import {
    validateOrganization as tryAddOrganization,
    resetValidation
} from "../../utils/Actions";
import { useSquawk, usePending } from "../../utils/Store";

interface Form {
    name: string;
    alias: string;
    pat: string;
    valid: boolean;
}

interface Action {
    type: keyof Form | "clear";
    value: string;
}

const validate = (form: Form) => {
    return {
        ...form,
        valid: !!form.alias.trim() && !!form.name.trim() && !!form.pat.trim()
    };
};

const reducer = (state: Form, action: Action) => {
    switch (action.type) {
        case "clear":
            return { name: "", alias: "", pat: "", valid: false };
        case "alias":
        case "name":
        case "pat":
            return validate({ ...state, [action.type]: action.value });
        default:
            throw new Error("Unknown action");
    }
};

const createDispatcher = (
    dispatch: React.Dispatch<Action>,
    type: keyof Form
) => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.currentTarget;
        dispatch({ type, value });
    };
};

export const AddToken = () => {
    const [visible, setVisible] = useState(false);

    const { validToken } = useSquawk("validToken");
    const validating = usePending("validToken");

    const [form, dispatch] = useReducer(reducer, {
        name: "",
        alias: "",
        pat: "",
        valid: false
    });

    useEffect(() => {
        if (validToken) {
            setVisible(false);
        }
    }, [validToken]);

    return (
        <>
            <Button
                icon="plus"
                intent="primary"
                onClick={() => {
                    resetValidation();
                    setVisible(true);
                }}
            />
            <Dialog
                canEscapeKeyClose={false}
                canOutsideClickClose={false}
                isOpen={visible}
                onClosed={() => dispatch({ type: "clear", value: "" })}
                className="bp3-dark"
            >
                <div className={Classes.DIALOG_HEADER}>
                    Add Azure Devops Organizations
                </div>
                <div className={Classes.DIALOG_BODY}>
                    <FormGroup
                        helperText="The name of the organization, given the URL https://dev.azure.com/<org>, this field should have the value of <org>"
                        label="Organization name"
                        labelFor="org"
                        labelInfo="(required)"
                    >
                        <InputGroup
                            id="org"
                            placeholder="Organization name"
                            autoComplete="off"
                            value={form.name}
                            onChange={createDispatcher(dispatch, "name")}
                            data-lpignore="true"
                        />
                    </FormGroup>
                    <FormGroup
                        helperText="A friendly alias for the organization"
                        label="Alias"
                        labelFor="alias"
                        labelInfo="(required)"
                    >
                        <InputGroup
                            id="alias"
                            placeholder="Organization alias"
                            autoComplete="off"
                            value={form.alias}
                            onChange={createDispatcher(dispatch, "alias")}
                            data-lpignore="true"
                        />
                    </FormGroup>
                    <FormGroup
                        helperText="The token needs to have full access to the following scopes: Build, and Release, and read access to Project and Team"
                        label="Personal Access Token"
                        labelFor="pat"
                        labelInfo="(required)"
                    >
                        <InputGroup
                            id="pat"
                            placeholder="Personal Access Token"
                            autoComplete="off"
                            type="password"
                            data-lpignore="true"
                            value={form.pat}
                            onChange={createDispatcher(dispatch, "pat")}
                        />
                    </FormGroup>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            text="Close"
                            onClick={() => setVisible(false)}
                        />
                        <Button
                            text="Save"
                            disabled={!form.valid}
                            intent="success"
                            loading={validating}
                            onClick={() => {
                                tryAddOrganization(form);
                            }}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

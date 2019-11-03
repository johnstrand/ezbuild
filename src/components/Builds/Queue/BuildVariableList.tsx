import React from "react";
import { Variables } from "utils/ApiTypes";
import { FormGroup, InputGroup } from "@blueprintjs/core";

interface Props {
    variables: Variables;
    visible: boolean;
}

const BuildVariableList = (props: Props) => {
    if (!props.visible) {
        return null;
    }

    return (
        <>
            {Object.keys(props.variables || {}).map(key => (
                <FormGroup key={key} label={key} labelFor={`var_${key}`}>
                    <InputGroup
                        id={`var_${key}`}
                        data-lpignore="true"
                        autoComplete="off"
                        readOnly={true} // Should actually check if override is allowed
                        value={props.variables[key].value}
                        onChange={() => {}} // Read-only for now
                    />
                </FormGroup>
            ))}
        </>
    );
};

export default BuildVariableList;

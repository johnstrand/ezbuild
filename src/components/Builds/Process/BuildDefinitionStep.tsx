import React, { useState } from "react";
import { Step } from "utils/ApiTypes";
import { FormGroup, InputGroup, AnchorButton } from "@blueprintjs/core";

interface Props {
    step: Step;
}

const BuildDefinitionStep = ({ step }: Props) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div>
            <h3>
                <AnchorButton
                    minimal
                    rightIcon={isOpen ? "arrow-down" : "arrow-right"}
                    onClick={() => setOpen(!isOpen)}
                >
                    Step: {step.displayName}
                </AnchorButton>
            </h3>
            {isOpen &&
                Object.keys(step.inputs).map(input => (
                    <FormGroup key={input} label={input} labelFor={input}>
                        <InputGroup
                            id={input}
                            placeholder={step.inputs[input].toString()}
                            readOnly
                        />
                    </FormGroup>
                ))}
        </div>
    );
};

export default BuildDefinitionStep;

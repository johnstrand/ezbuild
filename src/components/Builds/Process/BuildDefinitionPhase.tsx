import React from "react";
import { Phase } from "utils/ApiTypes";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import BuildDefinitionStep from "./BuildDefinitionStep";

interface Props {
    phase: Phase;
}

const BuildDefinitionPhase = ({ phase }: Props) => {
    return (
        <>
            <h2>Phase: {phase.name}</h2>
            {Object.keys(phase.target.executionOptions).map(opt => (
                <FormGroup key={opt} label={opt} labelFor={opt}>
                    <InputGroup
                        id={opt}
                        placeholder={phase.target.executionOptions[
                            opt
                        ].toString()}
                        readOnly
                    />
                </FormGroup>
            ))}
            {phase.steps.map(step => (
                <BuildDefinitionStep
                    key={`${phase.refName}_${step.displayName}`}
                    step={step}
                />
            ))}
        </>
    );
};

export default BuildDefinitionPhase;

import React, { ComponentType } from "react";
import { NonIdealState, HTMLSelect, FormGroup } from "@blueprintjs/core";

export const Hideable = <P extends any>(Component: ComponentType<P>) => {
    return (props: P & { hidden?: boolean; children?: React.ReactNode }) => {
        if (props.hidden) {
            return null;
        }

        return <Component {...props}>{props.children}</Component>;
    };
};

export const HideableNonIdealState = Hideable(NonIdealState);

export const HideableHtmlSelect = Hideable(HTMLSelect);

export const HideableFormGroup = Hideable(FormGroup);

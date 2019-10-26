import { useMemo } from "react";
import { Variables } from "./ApiTypes";

export const useDateFormat = (date: string) => {
    return useMemo(() => new Date(date).toLocaleString("sv-SE"), [date]);
};

export const convertVariables = (vars: Variables) => {
    const output: { [key: string]: any } = {};
    if (!vars) {
        return output;
    }
    for (const key of Object.keys(vars)) {
        output[key] = vars[key].value;
    }
    return output;
};

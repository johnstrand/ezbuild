import { useMemo } from "react";

export const useDateFormat = (date: string) => {
    return useMemo(() => new Date(date).toLocaleString("sv-SE"), [date]);
};

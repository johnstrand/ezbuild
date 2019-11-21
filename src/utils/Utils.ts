import { useMemo } from "react";
import { Variables } from "utils/ApiTypes";

export const useDateFormat = (date: string) => {
  return useMemo(() => (!!date ? new Date(date).toLocaleString("sv-SE") : ""), [
    date
  ]);
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

export const range = (start: number, count: number, step: number = 1) => {
  if (count < 0 || count !== Math.floor(count)) {
    throw new Error("Expected count to be a positive integer");
  }
  const result: number[] = [];
  while (count-- > 0) {
    result.push(start);
    start += step;
  }
  return result;
};

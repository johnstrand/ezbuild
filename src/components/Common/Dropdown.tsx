import React from "react";
import { Spinner } from "@blueprintjs/core";

interface DropdownItem<T extends string | number> {
    key: string | number;
    value: T;
    text: string;
}

interface Props<T extends string | number> {
    items: DropdownItem<T>[];
    value?: T;
    onChange: (value: T) => void;
    loading: boolean;
    noData: string;
}

export const Dropdown = <T extends string | number>(props: Props<T>) => {
    if (props.loading) {
        return (
            <div>
                <Spinner size={Spinner.SIZE_SMALL} />
            </div>
        );
    }

    if (props.items.length === 0) {
        return (
            <div className="bp3-select">
                <select defaultValue="nodata">
                    <option value="nodata">{props.noData}</option>
                </select>
            </div>
        );
    }

    return (
        <div className="bp3-select">
            <select
                value={props.value}
                onChange={({ currentTarget: { value } }) =>
                    props.onChange(value as any)
                }
            >
                {props.items.map(item => (
                    <option key={item.key} value={item.value}>
                        {item.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

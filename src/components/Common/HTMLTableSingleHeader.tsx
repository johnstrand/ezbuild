import React from "react";

interface Props {
    children: React.ReactNode;
}

export const HTMLTableSingleHeader = (props: Props) => {
    return (
        <thead>
            <tr>{props.children}</tr>
        </thead>
    );
};

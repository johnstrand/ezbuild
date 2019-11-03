import React from "react";

interface Props {
    children: React.ReactNode;
}

const HTMLTableSingleHeader = (props: Props) => {
    return (
        <thead>
            <tr>{props.children}</tr>
        </thead>
    );
};

export default HTMLTableSingleHeader;

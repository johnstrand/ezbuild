import React from "react";
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider
} from "@blueprintjs/core";
import { TokenList } from "../Tokens/TokenList";
import { SelectOrganization } from "./SelectOrganization";
import { SelectProject } from "./SelectProject";

export const TopMenu = () => {
    return (
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>ez-build</NavbarHeading>
                <NavbarDivider />
                <TokenList />
                <NavbarDivider />
                <SelectOrganization />
                <NavbarDivider />
                <SelectProject />
            </NavbarGroup>
        </Navbar>
    );
};

import React from "react";
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider
} from "@blueprintjs/core";
import { Tokens } from "../Tokens/Tokens";
import { SelectOrganization } from "./SelectOrganization";
import { SelectProject } from "./SelectProject";

export const TopMenu = () => {
    return (
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>ez-build</NavbarHeading>
                <NavbarDivider />
                <Tokens />
                <NavbarDivider />
                <SelectOrganization />
                <NavbarDivider />
                <SelectProject />
            </NavbarGroup>
        </Navbar>
    );
};

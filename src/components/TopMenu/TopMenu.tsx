import React from "react";
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider
} from "@blueprintjs/core";
import { Tokens } from "../Tokens/Tokens";
import { SelectOrganization } from "./SelectOrganization";

export const TopMenu = () => {
    return (
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>ez-build</NavbarHeading>
                <NavbarDivider />
                <Tokens />
                <SelectOrganization />
            </NavbarGroup>
        </Navbar>
    );
};

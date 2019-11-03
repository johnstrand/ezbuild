import React from "react";
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider
} from "@blueprintjs/core";
import SelectOrganization from "./SelectOrganization";
import SelectProject from "./SelectProject";
import SelectTenant from "./SelectTenant";

const TopMenu = () => {
    return (
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>ez-build</NavbarHeading>
                <NavbarDivider />
                <SelectTenant />
                <NavbarDivider />
                <SelectOrganization />
                <NavbarDivider />
                <SelectProject />
            </NavbarGroup>
        </Navbar>
    );
};

export default TopMenu;

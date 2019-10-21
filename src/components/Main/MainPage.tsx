import React, { useState } from "react";
import { Tabs, Tab } from "@blueprintjs/core";
import { BuildDefinitionList } from "../Builds/BuildDefinitionList";

export const MainPage = () => {
    const {
        location: { hash }
    } = window;

    const [selected, setSelected] = useState(hash || "#builds");

    return (
        <Tabs
            selectedTabId={selected}
            onChange={id => {
                window.location.hash = id.toString();
                setSelected(id.toString());
            }}
        >
            <Tab id="#builds" title="Builds" panel={<BuildDefinitionList />} />
            <Tab id="#releases" title="Releases" panel={<div>Releases</div>} />
        </Tabs>
    );
};

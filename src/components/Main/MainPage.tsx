import React, { useState } from "react";
import { Tabs, Tab } from "@blueprintjs/core";
import BuildDefinitionList from "components/Builds/Definitions/BuildDefinitionList";
import ReleaseDefinitionList from "components/Releases/Definitions/ReleaseDefinitionList";

const MainPage = () => {
  const {
    location: { hash }
  } = window;

  const pathSegments = (hash || "builds").split("/");

  const [selected, setSelected] = useState(
    "#" + pathSegments[pathSegments.length - 1]
  );

  return (
    <Tabs
      selectedTabId={selected}
      onChange={id => {
        setSelected(id.toString());
        const pathSegs = window.location.hash.split("/");
        pathSegs[pathSegs.length - 1] = id.toString().substr(1);
        window.location.hash = pathSegs.join("/");
      }}
      renderActiveTabPanelOnly
    >
      <Tab id="#builds" title="Builds" panel={<BuildDefinitionList />} />
      <Tab id="#releases" title="Releases" panel={<ReleaseDefinitionList />} />
    </Tabs>
  );
};

export default MainPage;

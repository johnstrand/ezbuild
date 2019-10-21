import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./App.css";
import { TopMenu } from "./components/TopMenu/TopMenu";

const App: React.FC = () => {
    return (
        <div className="bp3-dark app-root">
            <TopMenu />
        </div>
    );
};

export default App;

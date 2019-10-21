import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";
import { TopMenu } from "./components/TopMenu/TopMenu";
import { MainPage } from "./components/Main/MainPage";

const App: React.FC = () => {
    return (
        <div className="bp3-dark app-root">
            <TopMenu />
            <MainPage />
        </div>
    );
};

export default App;

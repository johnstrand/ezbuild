import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";
import { TopMenu } from "./components/TopMenu/TopMenu";
import { MainPage } from "./components/Main/MainPage";
import { useSquawk } from "./utils/Store";
import { Login } from "./components/Main/Login";

const App: React.FC = () => {
    const { account } = useSquawk("account");
    if (!account) {
        return <Login />;
    }
    return (
        <div className="bp3-dark app-root">
            <TopMenu />
            <MainPage />
        </div>
    );
};

export default App;

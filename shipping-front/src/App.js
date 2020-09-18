import React from "react";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import PortalPage from "./pages/PortalPage/PortalPage";
import { Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/portal">
          <PortalPage />
        </Route>
      </Switch>
    </div>
  );
}

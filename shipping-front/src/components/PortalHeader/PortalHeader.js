import React from "react";
import "./PortalHeader.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function PortalHeader() {
  return (
    <div className="portalHeader">
      <h1>Welcome to the portal, {localStorage.getItem("username")}</h1>
      <Button variant="contained" color="secondary">
        <Link to="/" className="logoutButton">
          Log out
        </Link>
      </Button>
    </div>
  );
}

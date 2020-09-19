import React from "react";
import "./PortalPage.scss";
import PortalHeader from "../../components/PortalHeader/PortalHeader";
import PortalLogic from "../../components/PortalLogic/PortalLogic";

export default function PortalPage() {
  return (
    <div className="portalPage">
      <PortalHeader />
      <PortalLogic />
    </div>
  );
}

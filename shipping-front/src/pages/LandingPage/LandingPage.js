import React, { useEffect } from "react";
import "./LandingPage.scss";
import UserForm from "../../components/UserForm/UserForm";

export default function LandingPage() {
  useEffect(() => {
    localStorage.clear();
  });
  return (
    <div className="landingPage">
      <UserForm />
    </div>
  );
}

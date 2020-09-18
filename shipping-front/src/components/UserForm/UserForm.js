import React, { useEffect } from "react";
import "./UserForm.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Redirect, useHistory } from "react-router-dom";

export default function UserForm() {
  let history = useHistory();
  const [username, setUserName] = React.useState([]);
  const [password, setPassword] = React.useState([]);
  const [redirectToPortal, setRedirectToPortal] = React.useState(false);

  useEffect(() => {
    if (redirectToPortal) {
      // go to portal page
      history.push("/portal");
    }
  }, [redirectToPortal]);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRedirectToPortal(true);
    console.log("press register button", redirectToPortal);
  };

  return (
    <div className="userForm">
      <form onSubmit={handleRegister}>
        {/* Inputs */}
        <TextField
          label="Username"
          required
          inputProps={{ minLength: 4 }}
          onChange={(e) => handleUsernameChange(e)}
        />
        <br />
        <br />
        <TextField
          label="Password"
          required
          inputProps={{ minLength: 8 }}
          onChange={(e) => handlePasswordChange(e)}
        />
        <br />
        <br />
        {/* Buttons */}
        <div className="buttons">
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

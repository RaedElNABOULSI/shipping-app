import React, { useEffect } from "react";
import "./UserForm.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UserForm() {
  let history = useHistory();
  const [username, setUserName] = React.useState([]);
  const [password, setPassword] = React.useState([]);
  const [redirectToPortal, setRedirectToPortal] = React.useState(false);
  const [registerClicked, setRegisterClicked] = React.useState(false);
  const [loginClicked, setLoginClicked] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (redirectToPortal) {
      // go to portal page
      history.push("/portal");
    }
  }, [redirectToPortal]);

  const clearInput = () => {
    setUserName([]);
    setPassword([]);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    clearInput();
    setRegisterClicked(false);
    setLoginClicked(false);
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerClicked) {
      axios
        .post("http://127.0.0.1:8000/api/user", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          handleOpenDialog();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (loginClicked) {
      setLoading(true);
      axios
        .post("http://127.0.0.1:8000/api/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          console.log("response is", response.data);
          // save  in local storage

          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("username", response.data.username);
          setRedirectToPortal(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="userForm">
      <form onSubmit={handleSubmit}>
        {/* Inputs */}
        <TextField
          label="Username"
          required
          inputProps={{ minLength: 4 }}
          onChange={(e) => handleUsernameChange(e)}
          value={username}
        />
        <br />
        <br />
        <TextField
          label="Password"
          required
          inputProps={{ minLength: 8 }}
          onChange={(e) => handlePasswordChange(e)}
          value={password}
        />
        <br />
        <br />
        {/* Buttons */}
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => setRegisterClicked(true)}
          >
            Register
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => setLoginClicked(true)}
          >
            Login
          </Button>
        </div>
      </form>
      {/* dialog  */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registration Successful !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please log in with your credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <CircularProgress />}
    </div>
  );
}

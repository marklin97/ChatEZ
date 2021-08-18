import React, { useState } from "react";
import Styles from "./ConfirmBox.module.scss";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import * as RequestActs from "../../../Store/RequestModule/actions";
import * as ProfileActs from "../../../Store/ProfileModule/actions";

import {
  Button,
  Snackbar,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
  makeStyles,
} from "@material-ui/core";

interface ConfirmBoxProps {
  email: string;
  open: boolean;
  handleClose: () => void;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  open,
  email,
  handleClose,
}): JSX.Element => {
  const useStyles = makeStyles(() => ({
    paper: { minWidth: "30%" },
  }));

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [sent, setSent] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleUserTyping = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmit = () => {
    if (msg.length > 0) {
      let sender = firebase.auth().currentUser.email;
      dispatch(RequestActs.addFriendAction(sender, email, msg));
      dispatch(ProfileActs.getUsersAction(sender));
      setSent(true);
    }

    handleClose();
    setAlert(true);
  };
  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setMsg("");
    setSent(false);
    setAlert(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        aria-labelledby="confirm-box"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <span className={Styles.header}>
          {"Please enter your request message "}
        </span>

        <DialogContent>
          <TextField
            variant="outlined"
            autoFocus
            multiline={true}
            rows={4}
            style={{
              width: "100%",
            }}
            onChange={handleUserTyping}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" spacing={3} justify="center">
            <Grid item xs={3}>
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleSubmit} autoFocus color="primary">
                Send
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Snackbar
        autoHideDuration={2500}
        open={alert}
        onClose={handleAlertClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {sent ? (
          <Alert severity="success">Success! message has been sent</Alert>
        ) : (
          <Alert severity="warning">Failed! Message cannot be empty </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default ConfirmBox;

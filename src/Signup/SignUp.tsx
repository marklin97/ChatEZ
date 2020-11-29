import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";
import Styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const SignUp = () => {
  const [display, setDisplay] = useState(false);
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    confirmation: "",
    signUpError: "",
  });

  const formValidation = () => {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // check if user has enter a valid email

    if (!userInputs.email.match(mailFormat)) {
      setUserInputs({
        ...userInputs,
        signUpError: "Please enter a valid email address!",
      });
      return false;
      // check if passwords matches confirmation
    } else if (userInputs.password !== userInputs.confirmation) {
      setUserInputs({ ...userInputs, signUpError: "Passwords not match!" });
      return false;
    }
    return true;
  };

  const submitSignUp = (e) => {
    e.preventDefault();

    if (formValidation()) {
      // after successfully registered an user, firebase will return an user object

      firebase
        .auth()
        .createUserWithEmailAndPassword(userInputs.email, userInputs.password)
        .then((authRes) => {
          if (authRes.user?.email) {
            setDisplay(true);
            const userObject = {
              email: authRes.user?.email,
              emailVerified: false,
            };
            firebase
              .firestore()
              .collection("users")
              .doc(userInputs.email)
              .set(userObject)
              .then(() => {
                sendVerification(firebase.auth().currentUser);
                // redirect user to the dashboard page after 5 seconds
              })
              .catch((err) => {
                setUserInputs({
                  ...userInputs,
                  signUpError: "Failed to add user",
                });
                console.log(err);
              });
          }
        })
        .catch((error) => {
          setUserInputs({ ...userInputs, signUpError: error.message });
          console.log(error);
        });
    }
  };
  const handleRedirection = () => {
    setDisplay(false);
    // redirect user to the dashboard page after 2 seconds
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };
  const userTyping = (input, e) => {
    switch (input) {
      case "email":
        setUserInputs({ ...userInputs, email: e.target.value });
        break;
      case "password":
        setUserInputs({ ...userInputs, password: e.target.value });
        break;
      case "password-confirmation":
        setUserInputs({ ...userInputs, confirmation: e.target.value });
        break;
      default:
        break;
    }
  };

  const sendVerification = (user) => {
    user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={Styles.main}>
      <Paper className={Styles.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={(e) => {
            submitSignUp(e);
          }}
          className={Styles.form}
        >
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="signup-email-input">
              Enter Your Email
            </InputLabel>
            <Input
              autoComplete="email"
              autoFocus
              id="signup-email-input"
              onChange={(e) => userTyping("email", e)}
            ></Input>
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="signup-password-input">
              Create A Password
            </InputLabel>
            <Input
              type="password"
              id="signup-password-input"
              onChange={(e) => userTyping("password", e)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="signup-password-confirmation-input">
              Confirm Your Password
            </InputLabel>
            <Input
              type="password"
              id="signup-password-confirmation-input"
              onChange={(e) => userTyping("password-confirmation", e)}
            ></Input>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={Styles.submit}
            style={{ marginTop: "5%" }}
          >
            Submit
          </Button>
          <Dialog open={display} maxWidth={"xs"}>
            <DialogTitle style={{ margin: "5% 0% 0% 5%" }}>
              <span style={{ color: "green" }}>
                <CheckCircleOutlineIcon
                  fontSize={"large"}
                  className={Styles.icon}
                />{" "}
                Thanks your account has been successfully created !
              </span>
            </DialogTitle>

            <DialogContent style={{ margin: "0% 0% 0% 5%" }}>
              <DialogContentText>
                Please check your inbox, an activation link has been sent to
                your registered email, which needs to be activated before you
                progress further.
              </DialogContentText>
            </DialogContent>

            <Button color="primary" onClick={handleRedirection}>
              OK
            </Button>
          </Dialog>
        </form>
        {userInputs.signUpError ? (
          <Typography className={Styles.errorText}>
            {userInputs.signUpError}
          </Typography>
        ) : null}
        <h4 className={Styles.noAccountHeader}>Already have an account?</h4>
        <Link className={Styles.loginLink} to="/login">
          Login
        </Link>
      </Paper>
    </div>
  );
};

export default SignUp;

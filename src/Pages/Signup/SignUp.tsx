import React, { useState } from "react";
import Styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Logo from "../../Assets/Images/Logo.png";
import Footer from "../../Components/Footer/Footer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Class } from "@material-ui/icons";

interface SignUpProps {}
const SignUp: React.FC<SignUpProps> = () => {
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmation: "",
    signUpError: "",
  });

  const formValidation = () => {
    // check if user has entered a valid email
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // check if user has entered a displayed name
    const nameFormat = /^[A-Z0-9]{6,18}$/gim;

    if (!userInputs.email.match(mailFormat)) {
      setUserInputs({
        ...userInputs,
        signUpError: "Please enter a valid email address",
      });
      return false;
      // check if passwords matches confirmation
    } else if (!userInputs.displayName.match(nameFormat)) {
      setUserInputs({
        ...userInputs,
        signUpError:
          "Please enter a display name 6-18 characters long. \n Your display name can be any combination of letters and numbers  ",
      });
      return false;
    } else if (userInputs.password !== userInputs.confirmation) {
      setUserInputs({
        ...userInputs,
        signUpError:
          "Short passwords are easy to guess. Try one with at least 6 characters.",
      });
      return false;
    }
    return true;
  };

  const submitSignUp = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      // after successfully registered an user, firebase will return an user object
      setUserInputs({ ...userInputs, signUpError: "" });
      setLoading(true);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userInputs.email, userInputs.password)
        .then(async (authRes) => {
          if (authRes.user?.email) {
            setDisplay(true);
            const userObject = {
              email: authRes.user?.email,
              emailVerified: true,
              displayName: userInputs.displayName,
            };

            await firebase
              .firestore()
              .collection("users")
              .doc(userInputs.email)
              .set(userObject)
              .then(() => {
                sendVerification(firebase.auth().currentUser);
              })
              .catch((err) => {
                setUserInputs({
                  ...userInputs,
                  signUpError: "Failed to add user",
                });
                console.log(err);
              });
            const buildDocKey = [userObject.email, "admin@portexe.com"].join(
              ":"
            );
            await firebase
              .firestore()
              .collection("chats")
              .doc(buildDocKey)
              .set({
                messages: firebase.firestore.FieldValue.arrayUnion({
                  sender: "Admin@portexe.com",
                  message: "It is our great pleasure to have you on board! ",
                  timeStamp: Date.now(),
                }),
                users: [userObject.email, "admin@portexe.com"],
                receiverHasRead: false,
              });
          }
        })
        .catch((error) => {
          setUserInputs({ ...userInputs, signUpError: error.message });
          setLoading(false);
          console.log(error);
        });
    }
  };
  const handleRedirection = () => {
    setDisplay(false);
    setLoading(true);
    // redirect user to the dashboard page after 2 seconds
    setTimeout(() => {
      window.location.href = "/dashboard";
      setLoading(false);
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
      case "displayName":
        setUserInputs({ ...userInputs, displayName: e.target.value });
        // console.log(userInputs.displayName);
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
    <div>
      <img src={Logo} className={Styles.logo} alt="Logo" />

      <Paper variant="outlined" className={Styles.signup_form}>
        {userInputs.signUpError ? (
          <span className={Styles.warning}>{userInputs.signUpError}</span>
        ) : null}

        <form
          onSubmit={(e) => {
            submitSignUp(e);
          }}
        >
          <FormControl required fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="signup-email-input">
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
            <InputLabel shrink={true} htmlFor="signup-displayName-input">
              Enter A Display Name
            </InputLabel>
            <Input
              autoComplete="name"
              autoFocus
              id="signup-displayName-input"
              onChange={(e) => userTyping("displayName", e)}
            ></Input>
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="signup-password-input">
              Create A Password
            </InputLabel>
            <Input
              type="password"
              id="signup-password-input"
              onChange={(e) => userTyping("password", e)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel
              shrink={true}
              htmlFor="signup-password-confirmation-input"
            >
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
            style={{ marginTop: "20px" }}
          >
            <AlternateEmailIcon className={Styles.emailIcon} />
            Sign Up
          </Button>
          <Dialog open={display} maxWidth={"xs"}>
            <DialogTitle>
              <CheckCircleOutlineIcon
                fontSize={"default"}
                className={Styles.checkIcon}
              />
              <span className={Styles.notification_title}>
                Your account has been successfully created !
              </span>
            </DialogTitle>

            <DialogContent>
              <span className={Styles.notification_text}>
                Please check your inbox, an activation link has been sent to
                your registered email, which needs to be activated before you
                progress further.
              </span>
            </DialogContent>

            <Button color="primary" onClick={handleRedirection}>
              OK
            </Button>
          </Dialog>
        </form>
        {loading ? (
          <CircularProgress color="secondary" className={Styles.loadingGif} />
        ) : null}
        <h5>Already have an account?</h5>
        <Link className={Styles.login_link} to="/login">
          <Typography color="textPrimary" variant="overline" display="inline">
            Login
          </Typography>
        </Link>
      </Paper>

      <Footer />
    </div>
  );
};

export default SignUp;

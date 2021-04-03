import React, { useState } from "react";
import Styles from "./Login.module.scss";
import { Link } from "../../../node_modules/react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Logo from "../../Assets/Images/Logo.png";
import Footer from "../../Components/Footer/Footer";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    loginError: "",
  });

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authRes) => {
        // User successfully signed in.
        // Create and store user account into database

        const { id, name } = authRes.additionalUserInfo.profile;
        const userObject = {
          /* If the third party platform return id instead of email, a unique email 
          needs to be created in the format of uniqueId + '@' + platform provider */
          email: authRes.user.email
            ? authRes.user.email
            : id + "@" + authRes.additionalUserInfo.providerId,
          emailVerified: true,
          displayName: name,
        };

        firebase
          .firestore()
          .collection("users")
          .doc(userObject.email)
          .set(userObject)
          .then(() => {
            // Initiate welcome message from admin
            const buildDocKey = [userObject.email, "admin@portexe.com"].join(
              ":"
            );
            firebase
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
          })
          .then(() => {
            window.location.href = "/dashboard";
          })
          .catch((err) => {
            console.log(err);
          });

        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/dashboard",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  const userTyping = (input, e) => {
    switch (input) {
      case "email":
        setUserInputs({ ...userInputs, email: e.target.value });
        break;
      case "password":
        setUserInputs({ ...userInputs, password: e.target.value });
        break;
      default:
        break;
    }
  };
  const userLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!userInputs.email.match(mailFormat)) {
      setUserInputs({
        ...userInputs,
        loginError: "Please enter a valid email address",
      });
    } else {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(userInputs.email, userInputs.password)
        .then(() => {
          setUserInputs({
            ...userInputs,
            loginError: "",
          });
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          setLoading(false);
          setUserInputs({
            ...userInputs,
            loginError:
              "The email and password you entered did not match our records. Please double check and try again.",
          });
          console.log(err);
        });
      setLoading(false);
    }
  };
  return (
    <div>
      <img src={Logo} className={Styles.logo} alt="Logo" />
      <Footer />
      <Paper elevation={3} className={Styles.login_form}>
        <form onSubmit={(e) => userLogin(e)}>
          {userInputs.loginError ? (
            <span className={Styles.warning}>{userInputs.loginError}</span>
          ) : null}
          <FormControl required fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="login-email-input">
              Email Address
            </InputLabel>
            <Input
              autoComplete="email"
              autoFocus
              onChange={(e) => userTyping("email", e)}
              id="login-email-input"
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="login-password-input">
              Password
            </InputLabel>
            <Input
              autoComplete="current-password"
              type="password"
              onChange={(e) => userTyping("password", e)}
              id="login-password-input"
            ></Input>
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth={true}
            className={Styles.login_button}
          >
            <AlternateEmailIcon className={Styles.emailIcon} />
            <span className={Styles.login_button_text}>Login</span>
          </Button>
        </form>

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        {loading ? (
          <CircularProgress color="secondary" className={Styles.loadingGif} />
        ) : null}
        <Typography variant="subtitle2">Don't Have An Account?</Typography>
        <Link className={Styles.signup_link} to="/signup">
          <Typography color="textPrimary" variant="overline" display="inline">
            SIGN UP
          </Typography>
        </Link>
      </Paper>
    </div>
  );
};

export default Login;

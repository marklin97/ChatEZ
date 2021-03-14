import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Styles from "./Login.module.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Logo from "../../Assets/Images/Logo.png";
import Footer from "../../Components/Footer/Footer";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

// Styles
const Login = () => {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    loginError: "",
  });

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
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
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!userInputs.email.match(mailFormat)) {
      setUserInputs({
        ...userInputs,
        loginError: "Please enter a valid email address",
      });
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userInputs.email, userInputs.password)
        .then(() => {
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          setUserInputs({
            ...userInputs,
            loginError:
              "The email and password you entered did not match our records. Please double check and try again.",
          });
          console.log(err);
        });
    }
  };
  return (
    <div className={Styles.main}>
      <img src={Logo} className={Styles.logo} alt="Logo" />
      <Footer />
      <Paper elevation={3} className={Styles.paper}>
        <form className={Styles.form} onSubmit={(e) => userLogin(e)}>
          {userInputs.loginError ? (
            <span className={Styles.errorText}>{userInputs.loginError}</span>
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
            fullWidth
            className={Styles.loginButton}
          >
            <AlternateEmailIcon className={Styles.emailButton} />
            <span className={Styles.loginButtonText}>Login</span>
          </Button>
        </form>

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />

        <Typography variant="subtitle2">Don't Have An Account?</Typography>
        <Link className={Styles.signUpLink} to="/signup">
          <Typography color="textPrimary" variant="overline" display="inline">
            SIGN UP
          </Typography>
        </Link>
      </Paper>
    </div>
  );
};

export default Login;

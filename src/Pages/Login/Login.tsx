/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Styles from "./Login.module.scss";
import { Link } from "../../../node_modules/react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Footer from "../../Components/Footer/Footer";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import * as actions from "../../Store/LoginModule/actions";

import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  /**
   * This is user's current login status
   * */
  const loginError = useSelector(
    (state: RootState) => state.loginReducer.errorMsg
  );

  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/

  /**
   *  This hook holds the state of display of loading widget
   * */
  const [loading, setLoading] = useState(false);
  /**
   *  This hook holds the state of user inputs
   *  This state will handle by redux in future
   * */
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    inputError: "",
  });
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is a callback function to be invoked after user has successfully login
   * */

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authRes: any) => {
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
          gender: "male",
          description: "",
          birthday: "",
        };
        // initiate welcome message from admin
        dispatch(actions.thirdPtyLoginAction(userObject));
        setLoading(true);
        return false;
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
    privacyPolicyUrl: "<your-tos-url>",
  };

  /**
   * This is an function to handle user typing in the login form
   * */
  const userTyping = (input: string, e) => {
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

  /**
   * This is an function to handle user's login operation with email and password
   * */
  const userLogin = async (e) => {
    e.preventDefault();
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!userInputs.email.match(mailFormat)) {
      setUserInputs({
        ...userInputs,
        inputError: "Please enter a valid email address",
      });
    } else {
      setLoading(true);
      dispatch(actions.userLoginAction(userInputs));
    }
  };
  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div>
      <Paper elevation={3} className={Styles.loginForm}>
        <form
          onSubmit={(e) => {
            // userLogin(e);
            userLogin(e);
          }}
        >
          {userInputs.inputError ? (
            <span className={Styles.loginForm_text__warning}>
              {userInputs.inputError}
            </span>
          ) : (
            <span className={Styles.loginForm_text__warning}>{loginError}</span>
          )}

          <FormControl required fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="login-email-input">
              {t("loginForm.emailLabel")}
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
              {t("loginForm.passwordLabel")}
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
            className={Styles.loginForm_btn}
          >
            <AlternateEmailIcon className={Styles.loginForm_emailIcon} />
            <span className={Styles.loginForm_buttonText}>
              {t("loginForm.loginLabel")}
            </span>
          </Button>
        </form>

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <div className={Styles.loginForm_loader}>
          {!loginError && loading ? (
            <CircularProgress color="secondary" />
          ) : null}
        </div>
        <Typography variant="subtitle2">
          {" "}
          {t("loginForm.suggestion")}
        </Typography>
        <Link className={Styles.loginForm_link} to="/signup">
          <Typography color="textPrimary" variant="overline" display="inline">
            {t("loginForm.signUpLink")}
          </Typography>
        </Link>
      </Paper>
      <Footer />
    </div>
  );
};

export default Login;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

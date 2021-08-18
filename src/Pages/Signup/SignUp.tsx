/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import Styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import * as actions from "../../Store/SignUpModule/actions";
import { useTranslation } from "react-i18next";

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
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /**
   * This is user's current login status
   * */
  const signUpError = useSelector(
    (state: RootState) => state.signUpReducer.errorMsg
  );
  /**
   * This is user's current sign up status
   * */
  const signUpState = useSelector(
    (state: RootState) => state.signUpReducer.signUpState
  );
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  // /**
  //  *  This hook holds the state of display of pop up dialog
  //  * */
  // const [display, setDisplay] = useState(false);
  /**
   *  This hook holds the state of display of loading gif
   * */
  const [loading, setLoading] = useState(false);
  /**
   *  This hook holds the state of user inputs
   * */
  const [userInputs, setUserInputs] = useState({
    email: "",
    displayName: "",
    password: "",
    pwdConfirm: "",
    inputError: "",
  });
  const { email, displayName, password, inputError } = userInputs;
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/

  /**
   * This is a function validates user's inputs
   * */
  const formValidation = () => {
    // check if user has entered a valid email
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // check if user has entered a displayed name
    // Matches any character from a-z or 0-9 but the length range must between 6 to 18.
    const nameFormat = /^[A-Z0-9_]{6,18}$/gim;

    if (!userInputs.email.match(mailFormat)) {
      setUserInputs({
        ...userInputs,
        inputError: "Please enter a valid email address",
      });
      return false;
      // check if passwords matches confirmation
    } else if (!userInputs.displayName.match(nameFormat)) {
      setUserInputs({
        ...userInputs,
        inputError:
          "Please enter a display name 6-18 characters long. \n Your display name can be any combination of letters and numbers  ",
      });
      return false;
    } else if (userInputs.password !== userInputs.pwdConfirm) {
      setUserInputs({
        ...userInputs,
        inputError: "The password did not match the re-typed password.",
      });
      return false;
    } else if (userInputs.password.length < 6) {
      setUserInputs({
        ...userInputs,
        inputError:
          "Short passwords are easy to guess. Try one with at least 6 characters.",
      });
      return false;
    }
    return true;
  };

  /**
   * This is a function handles submit form operation
   * */
  const submitSignUp = async (e) => {
    e.preventDefault();

    if (formValidation()) {
      // after successfully registered an user, firebase will return an user object
      setUserInputs({ ...userInputs, inputError: "" });
      setLoading(true);
      dispatch(actions.userSignUpAction(email, password, displayName));
    }
  };
  /**
   * This is a function handle redirection after user has submit the form
   * */
  const handleRedirection = () => {
    // setDisplay(false);
    setLoading(true);
    // redirect user to the dashboard page after 2 seconds
    setTimeout(() => {
      window.location.href = "/dashboard";
      setLoading(false);
    }, 2000);
  };
  /**
   * This is an function to handle user typing in the sign up form
   * */
  const userTyping = (input, e) => {
    switch (input) {
      case "email":
        setUserInputs({ ...userInputs, email: e.target.value });
        break;
      case "password":
        setUserInputs({ ...userInputs, password: e.target.value });
        break;
      case "password-confirmation":
        setUserInputs({ ...userInputs, pwdConfirm: e.target.value });
        break;
      case "displayName":
        setUserInputs({ ...userInputs, displayName: e.target.value });
        // console.log(userInputs.displayName);
        break;
      default:
        break;
    }
  };

  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div>
      <div></div>
      <Paper variant="outlined" className={Styles.signupForm}>
        {inputError ? (
          <span className={Styles.signupForm_text__warning}>{inputError}</span>
        ) : (
          <span className={Styles.signupForm_text__warning}>{signUpError}</span>
        )}

        <form
          onSubmit={(e) => {
            submitSignUp(e);
          }}
        >
          <FormControl required fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="signup-email-input">
              {/* Enter Your Email */}
              {t("signUpForm.emailLabel")}
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
              {t("signUpForm.nameLabel")}
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
              {t("signUpForm.passwordLabel")}
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
              {t("signUpForm.confirmLabel")}
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
            <AlternateEmailIcon className={Styles.signupForm_emailIcon} />
            {t("signUpForm.signUpLabel")}
          </Button>
          <Dialog open={signUpState} maxWidth={"xs"}>
            <DialogTitle>
              <CheckCircleOutlineIcon
                fontSize={"default"}
                className={Styles.signupForm_checkIcon}
              />
              <span className={Styles.signupForm_notification__primary}>
                Your account has been successfully created !
              </span>
            </DialogTitle>

            <DialogContent>
              <span className={Styles.signupForm_notification__secondary}>
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
        {!signUpError && loading ? (
          <CircularProgress
            color="secondary"
            className={Styles.signupForm_loader}
          />
        ) : null}
        <Typography variant="subtitle2" style={{ paddingTop: "20px" }}>
          {t("signUpForm.suggestion")}
        </Typography>

        <Link className={Styles.signupForm_link} to="/login">
          <Typography color="textPrimary" variant="overline" display="inline">
            {t("signUpForm.loginLink")}
          </Typography>
        </Link>
      </Paper>

      <Footer />
    </div>
  );
};

export default SignUp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

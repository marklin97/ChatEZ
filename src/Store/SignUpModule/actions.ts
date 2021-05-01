import * as types from "./types";
/**
 * User Sign Up Action
 */
const userSignUpAction = (
  email,
  password,
  displayName
): types.SignUpActionTypes => {
  return {
    type: types.SIGNUP,
    payload: {
      email: email,
      displayName: displayName,
      password: password,
    },
  };
};
/**
 * User Sign Up Success Action
 */
const SignUpSuccessAction = (): types.SignUpActionTypes => {
  return {
    type: types.SIGNUP_SUCCEED,
  };
};
/**
 * User Sign Up Fail Action
 */
const SignUpFailAction = (errorMsg: string): types.SignUpActionTypes => {
  return {
    type: types.SIGNUP_FAILED,
    payload: {
      errorMsg: errorMsg,
    },
  };
};
export { userSignUpAction, SignUpSuccessAction, SignUpFailAction };

/**
 * Action types listen by Saga
 */
const SIGNUP = "SIGNUP";

/**
 * Action types listen by Reducer
 */
const SIGNUP_SUCCEED = "SIGNUP_SUCCEED";
const SIGNUP_FAILED = "LOGIN_FAILED";

export { SIGNUP, SIGNUP_SUCCEED, SIGNUP_FAILED };
/**
 * This action will dispatch an SignUp action with the payload to saga
 */
interface UserSignUpAction {
  type: typeof SIGNUP;
  payload: {
    email: "";
    displayName: "";
    password: "";
  };
}
/**
 * This action will dispatch an SIGNUP_SUCCESS action to reducer
 */
interface SignUpSuccessAction {
  type: typeof SIGNUP_SUCCEED;
}
/**
 * This action will dispatch an SIGNUP_FAIL action to reducer
 */
interface SignUpFailAction {
  type: typeof SIGNUP_FAILED;
  payload: {
    errorMsg: string;
  };
}

export interface SignUpReducer {
  signUpState: boolean;
  errorMsg: string;
}
export type SignUpActionTypes =
  | UserSignUpAction
  | SignUpSuccessAction
  | SignUpFailAction;

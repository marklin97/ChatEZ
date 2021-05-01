/**
 * Action types listen by Saga
 */
const LOGIN = "LOGIN";
const LOGIN_THIRDPARTY = "LOGIN_THIRDPARTY";
const LOGOUT = "LOGOUT";
const LOGIN_TOKEN = "LOGIN_TOKEN";

/**
 * Action types listen by Reducer
 */
const LOGIN_SUCCEED = "LOGIN_SUCCEED ";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT_SUCCEED = "LOGOUT_SUCCEED";
const LOGOUT_FAILED = "LOGOUT_FAILED";
export {
  LOGIN,
  LOGOUT,
  LOGIN_TOKEN,
  LOGIN_THIRDPARTY,
  LOGIN_FAILED,
  LOGIN_SUCCEED,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
};

/**
 * This action will dispatch an LOGIN action with the payload to saga
 */
interface UserLoginAction {
  type: typeof LOGIN;
  payload: {
    userName: "";
    password: "";
  };
}
/**
 * This action will dispatch an LOGOUT action to saga
 */
interface UserLogoutAction {
  type: typeof LOGOUT;
}
/**
 * This action will dispatch an LOGIN_TOKEN action with the payload to saga
 */
interface UserLoginWithTokenAction {
  type: typeof LOGIN_TOKEN;
}
/**
 * This action will dispatch an LOGIN_TOKEN action with the payload to saga
 * @param {string} payload.loginPlatform third party platform
 */
interface ThirdPartyLoginAction {
  type: typeof LOGIN_THIRDPARTY;
  payload: {
    userProfile: object;
  };
}

/**
 * This action will dispatch an LOGIN_SUCCESS action to reducer
 */
interface LoginSucceedAction {
  type: typeof LOGIN_SUCCEED;
}
/**
 * This action will dispatch an LOGIN_FAILED action to reducer
 * @param {string} payload.errorMessage login fail message
 */
interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: {
    errorMessage: string;
  };
}
/**
 * This action will dispatch an LOGOUT_SUCCESS action to reducer
 */
interface LogoutSucceedAction {
  type: typeof LOGOUT_SUCCEED;
}
/**
 * This action will dispatch an LOGOUT_FAILED action to reducer
 */
interface LogoutFailedAction {
  type: typeof LOGOUT_FAILED;
}
export type LoginActionTypes =
  | UserLoginAction
  | UserLoginWithTokenAction
  | UserLogoutAction
  | ThirdPartyLoginAction
  | LoginSucceedAction
  | LoginFailedAction
  | LogoutSucceedAction
  | LogoutFailedAction;

export interface LoginReducer {
  loginState: boolean;
  errorMsg: string;
}

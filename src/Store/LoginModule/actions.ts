import * as types from "./types";

/**
 * User Login Action
 */
const userLoginAction = (userInputs): types.LoginActionTypes => {
  return {
    type: types.LOGIN,
    payload: {
      userName: userInputs.email,
      password: userInputs.password,
    },
  };
};
/**
 * user login with token action
 * @param loginPosition
 */
const thirdPtyLoginAction = (userProfile): types.LoginActionTypes => {
  return {
    type: types.LOGIN_THIRDPARTY,
    payload: {
      userProfile: userProfile,
    },
  };
};

/**
 * user login with token action
 * @param loginPosition
 */
const userLoginWithTokenAction = (): types.LoginActionTypes => {
  return {
    type: types.LOGIN_TOKEN,
  };
};

/**
 * user login succeed action
 * @param loginPosition
 */
const userLoginSuccessAction = (): types.LoginActionTypes => {
  return {
    type: types.LOGIN_SUCCEED,
  };
};
/**
 * user login fail action
 * @param loginPosition
 */
const userLoginFailAction = (): types.LoginActionTypes => {
  return {
    type: types.LOGIN_FAILED,
    payload: {
      errorMessage: "",
    },
  };
};
/**
 * user logout action
 * @param
 */
const userLogoutAction = (): types.LoginActionTypes => {
  return {
    type: types.LOGOUT,
  };
};
/**
 * user logout succeed action
 * @param
 */
const userLogoutSuccessAction = (): types.LoginActionTypes => {
  return {
    type: types.LOGOUT_SUCCEED,
  };
};
/**
 * user logout fail action
 * @param
 */
const userLogoutFailedAction = (): types.LoginActionTypes => {
  return {
    type: types.LOGOUT_FAILED,
  };
};
export {
  userLoginAction,
  userLoginWithTokenAction,
  userLoginSuccessAction,
  userLoginFailAction,
  userLogoutAction,
  userLogoutSuccessAction,
  userLogoutFailedAction,
  thirdPtyLoginAction,
};

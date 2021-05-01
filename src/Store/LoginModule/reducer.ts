import * as types from "./types";
const initState: types.LoginReducer = {
  // more ...
  loginState: false,
  errorMsg: "",
};

export default (
  state = initState,
  action: types.LoginActionTypes
): types.LoginReducer => {
  switch (action.type) {
    case types.LOGIN_SUCCEED:
      return {
        ...state,
        loginState: true,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        loginState: false,
        errorMsg:
          "The email and password you entered did not match our records. Please double check and try again",
      };
    case types.LOGOUT_SUCCEED:
      return {
        ...state,
        loginState: false,
      };
    case types.LOGOUT_FAILED:
      return {
        ...state,
        loginState: true,
      };
    default:
      return state;
  }
};

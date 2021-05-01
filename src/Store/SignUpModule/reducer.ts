import * as types from "./types";
const initState: types.SignUpReducer = {
  signUpState: false,
  errorMsg: "",
};

export default (
  state = initState,
  actions: types.SignUpActionTypes
): types.SignUpReducer => {
  switch (actions.type) {
    case types.SIGNUP_SUCCEED:
      return {
        ...state,
        signUpState: true,
      };
    case types.SIGNUP_FAILED:
      return {
        ...state,
        signUpState: false,
        errorMsg: actions.payload.errorMsg,
      };
    default:
      return state;
  }
};

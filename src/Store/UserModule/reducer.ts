import * as types from "./types";
const initState: types.UserProfileReducer = {
  email: "",
  avatar: "",
  displayName: "",
  gender: "",
  description: "",
  birthday: "",
  errorMsg: "",
  messages: {},
};
export default (
  state = initState,
  action: types.UserProfileActiontypes
): types.UserProfileReducer => {
  switch (action.type) {
    case types.GETAVATAR_SUCCEED:
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    case types.GETAVATAR_FAILED:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    case types.GETMESSAGE_SUCCEED:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case types.GETMESSAGE_FAILED:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    case types.GETPROFILE_SUCCEED:
      return {
        ...state,
        displayName: action.payload.displayName,
        gender: action.payload.gender,
        description: action.payload.description,
        birthday: action.payload.birthday,
      };
    case types.GETPROFILE_FAILED:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

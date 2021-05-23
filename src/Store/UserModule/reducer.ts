import { profile } from "console";
import * as types from "./types";
const reader = new FileReader();
const initState: types.UserReducer = {
  email: "",
  avatar: "",
  imgFile: "",
  messages: {},
  errorMsg: "",
  profile: {
    displayName: "",
    gender: "",
    description: "",
    birthday: "",
  },
};
export default (
  state = initState,
  action: types.UserProfileActionTypes
): types.UserReducer => {
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
        profile: {
          displayName: action.payload.displayName,
          gender: action.payload.gender,
          description: action.payload.description,
          birthday: action.payload.birthday,
        },
      };
    case types.GETPROFILE_FAILED:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };

    case types.UPDATEPROFILE_SUCCEED:
      return {
        ...state,
        avatar: action.payload.avatar,
        profile: {
          ...state.profile,
          description: action.payload.profile.description,
          birthday: action.payload.profile.birthday,
          gender: action.payload.profile.gender,
        },
      };
    case types.UPDATEPROFILE_FAIL:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

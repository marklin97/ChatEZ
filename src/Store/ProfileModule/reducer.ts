import * as types from "./types";
const initState: types.ProfileReducer = {
  errorMsg: "",
  imgFile: "",
  updateSuccess: null,
  users: {},
};
export default (
  state = initState,
  action: types.UserProfileActionTypes
): types.ProfileReducer => {
  switch (action.type) {
    case types.RESET:
      return {
        ...state,
        updateSuccess: null,
      };
    case types.GETAVATAR_SUCCEED:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.email]: {
            profile: {
              ...state.users[action.payload.email].profile,
              avatar: action.payload.avatar,
            },
          },
        },
      };
    case types.GETAVATAR_FAILED:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    case types.GETPROFILE_SUCCEED:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.email]: {
            profile: {
              displayName: action.payload.displayName,
              gender: action.payload.gender,
              description: action.payload.description,
              birthday: action.payload.birthday,
            },
          },
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
        updateSuccess: true,
        users: {
          ...state.users,
          [action.payload.email]: {
            profile: {
              ...state.users[action.payload.email].profile,
              avatar: action.payload.avatar
                ? action.payload.avatar
                : state.users[action.payload.email].profile.avatar,
              gender: action.payload.gender,
              description: action.payload.description,
              birthday: action.payload.birthday,
            },
          },
        },
      };
    case types.UPDATEPROFILE_FAIL:
      return {
        ...state,
        updateSuccess: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

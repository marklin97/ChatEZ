import { Avatar } from "@material-ui/core";
import FriendList from "../../Components/FriendList/FriendList";
import * as types from "./types";
const initState: types.FriendReducer = {
  errorMsg: "",
  friends: {},
};
export default (
  state = initState,
  action: types.FriendProfileActionTypes
): types.FriendReducer => {
  switch (action.type) {
    case types.GETAVATAR_SUCCEED:
      return {
        ...state,
        friends: {
          ...state.friends,
          [action.payload.email]: {
            profile: {
              ...state.friends[action.payload.email],
              avatar: action.payload.avatar,
            },
          },
        },
      };
    case types.GETAVATAR_FAILED:
      return {
        ...state,
      };
    case types.GETPROFILE_SUCCEED:
      return {
        ...state,
        friends: {
          ...state.friends,
          [action.payload.email]: {
            profile: {
              ...state.friends[action.payload.email],
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
      };
    default:
      return state;
  }
};

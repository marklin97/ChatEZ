import * as types from "./types";
/**
 * Get User Avatar Action
 */
const getAvatarAction = (email: string): types.GetAvatarActionTypes => {
  return {
    type: types.GETAVATAR,
    payload: {
      email: email,
    },
  };
};
/**
 * Get User Avatar SUCCESS Action
 */
const getAvatarSuccessAction = (
  email: string,
  avatar: string
): types.GetAvatarActionTypes => {
  return {
    type: types.GETAVATAR_SUCCEED,
    payload: {
      email: email,
      avatar: avatar,
    },
  };
};

/**
 * Get User Avatar FAIL Action
 */
const getAvatarFailAction = (errorMsg: string): types.GetAvatarActionTypes => {
  return {
    type: types.GETAVATAR_FAILED,
    payload: {
      errorMsg: errorMsg,
    },
  };
};
/**
 * Get User Profile Action
 */
const getProfileAction = (email: string): types.GetProfileActionTypes => {
  return {
    type: types.GETPROFILE,
    payload: {
      email: email,
    },
  };
};
/**
 * Get User Profile Success Action
 */
const getProfileSuccessAction = (
  email: string,

  displayName: string,
  birthday: string,
  gender: string,
  description: string
): types.GetProfileActionTypes => {
  return {
    type: types.GETPROFILE_SUCCEED,
    payload: {
      email: email,
      displayName: displayName,
      birthday: birthday,
      gender: gender,
      description: description,
    },
  };
};
/**
 * Get User Profile Fail Action
 */
const getProfileFailAction = (
  errorMsg: string
): types.GetProfileActionTypes => {
  return {
    type: types.GETPROFILE_FAILED,
    payload: {
      errorMsg: errorMsg,
    },
  };
};
const getFriendsAction = (email: string): types.FriendProfileActionTypes => {
  return {
    type: types.GETFRIENDS,
    payload: {
      email: email,
    },
  };
};

export {
  getAvatarAction,
  getAvatarSuccessAction,
  getAvatarFailAction,
  getProfileAction,
  getProfileSuccessAction,
  getProfileFailAction,
  getFriendsAction,
};

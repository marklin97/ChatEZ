import * as types from "./types";
const resetStateAction = (): types.UpdateProfileActionTypes => {
  return {
    type: types.RESET,
  };
};
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
const getUsersAction = (email: string): types.UserProfileActionTypes => {
  return {
    type: types.GETUSERS,
    payload: {
      email: email,
    },
  };
};

const updateProfileAction = (
  imgFile?: File,
  email?: string,
  gender?: string,
  description?: string,
  birthday?: string
): types.UpdateProfileActionTypes => {
  return {
    type: types.UPDATEPROFILE,
    payload: {
      imgFile: imgFile,
      email: email,
      gender: gender,
      description: description,
      birthday: birthday,
    },
  };
};

const updateProfileSuccessAction = (
  email: string,
  avatar?: string,
  gender?: string,
  description?: string,
  birthday?: string
): types.UpdateProfileActionTypes => {
  return {
    type: types.UPDATEPROFILE_SUCCEED,
    payload: {
      email: email,
      avatar: avatar,
      gender: gender,
      description: description,
      birthday: birthday,
    },
  };
};

const updateProfileFailAction = (
  errorMsg: string
): types.UpdateProfileActionTypes => {
  return {
    type: types.UPDATEPROFILE_FAIL,
    payload: {
      errorMsg: errorMsg,
    },
  };
};
export {
  resetStateAction,
  getAvatarAction,
  getAvatarSuccessAction,
  getAvatarFailAction,
  getProfileAction,
  getProfileSuccessAction,
  getProfileFailAction,
  getUsersAction,
  updateProfileAction,
  updateProfileSuccessAction,
  updateProfileFailAction,
};

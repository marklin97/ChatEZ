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
const getAvatarSuccessAction = (avatar: string): types.GetAvatarActionTypes => {
  return {
    type: types.GETAVATAR_SUCCEED,
    payload: {
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
  displayName: string,
  birthday: string,
  gender: string,
  description: string
): types.GetProfileActionTypes => {
  return {
    type: types.GETPROFILE_SUCCEED,
    payload: {
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

/**
 * Get User Message Action
 */
const getMsgAction = (email: string): types.GetMessageActionTypes => {
  return {
    type: types.GETMESSAGE,
    payload: {
      email: email,
    },
  };
};

/**
 * Get User Message SUCCESS Action
 */
const getMsgSuccessAction = (messages: object): types.GetMessageActionTypes => {
  return {
    type: types.GETMESSAGE_SUCCEED,
    payload: {
      messages: messages,
    },
  };
};
/**
 * Get User Message FAIL Action
 */
const getMsgFailAction = (errorMsg: string): types.GetMessageActionTypes => {
  return {
    type: types.GETMESSAGE_FAILED,
    payload: {
      errorMsg: errorMsg,
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
  getMsgAction,
  getMsgSuccessAction,
  getMsgFailAction,
};

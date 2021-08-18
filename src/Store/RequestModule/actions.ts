import * as types from "./types";
const resetAction = () => {
  return {
    type: types.RESET,
  };
};
const getUserAction = (keyword: string): types.GetUserActionTypes => {
  return {
    type: types.GETUSER,
    payload: {
      keyword: keyword,
    },
  };
};
const getUserSuccessAction = (
  email: string,
  displayName: string
): types.GetUserActionTypes => {
  return {
    type: types.GETUSER_SUCCESS,
    payload: {
      email: email,
      displayName: displayName,
    },
  };
};
const getUserFailAction = (errorMsg: string): types.GetUserActionTypes => {
  return {
    type: types.GETUSER_FAIL,
    payload: {
      errorMsg: errorMsg,
    },
  };
};

const addFriendAction = (
  sender: string,
  receiver: string,
  msg: string
): types.AddFriendActionTypes => {
  return {
    type: types.ADDFRIEND,
    payload: {
      sender: sender,
      receiver: receiver,
      msg: msg,
    },
  };
};
const addFriendSuccessAction = (email: string): types.AddFriendActionTypes => {
  return {
    type: types.ADDFRIEND_SUCCESS,
    payload: {
      email: email,
    },
  };
};

const addFriendFailAction = (errorMsg: string): types.AddFriendActionTypes => {
  return {
    type: types.ADDFRIEND_FAIL,
    payload: {
      errorMsg: errorMsg,
    },
  };
};

export {
  resetAction,
  addFriendAction,
  addFriendSuccessAction,
  addFriendFailAction,
  getUserAction,
  getUserSuccessAction,
  getUserFailAction,
};

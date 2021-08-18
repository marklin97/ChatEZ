import * as types from "./types";
/**
 * Send Message action
 */
const sendMsgAction = (
  email: string,
  message: string
): types.SendMsgActionTypes => {
  return {
    type: types.SENDMSG,
    payload: {
      email: email,
      message: message,
    },
  };
};

const sendMsgSuccessAction = (
  email: string,
  message: string,
  docKey: string
) => {
  return {
    type: types.SENDMSG_SUCCEED,
    payload: {
      email: email,
      message: message,
      docKey: docKey,
    },
  };
};

const sendMsgFailAction = (errorMsg: string) => {
  return {
    type: types.SENDMSG_FAILED,
    payload: {
      errorMsg: errorMsg,
    },
  };
};

const getMsgAction = (email: string) => {
  return {
    type: types.GETMSG,
    payload: {
      email: email,
    },
  };
};

const getMsgSuccessAction = (email: string, messages: {}) => {
  return {
    type: types.GETMSG_SUCCEED,
    payload: {
      email: email,
      messages: messages,
    },
  };
};
const getMsgFailAction = (errorMsg: string) => {
  return {
    type: types.GETMSG_FAILED,
    payload: {
      errorMsg: errorMsg,
    },
  };
};

export {
  getMsgAction,
  getMsgFailAction,
  getMsgSuccessAction,
  sendMsgAction,
  sendMsgFailAction,
  sendMsgSuccessAction,
};

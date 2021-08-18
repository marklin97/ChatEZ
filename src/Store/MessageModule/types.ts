/**
 * Action types listen by Saga
 */
const SENDMSG = "SENDMSG";
const GETMSG = "GETMSG";

/**
 * Action types listen by Reducer
 */
const SENDMSG_SUCCEED = "SENDMSG_SUCCEED";
const SENDMSG_FAILED = "SENDMSG_FAILED";

const GETMSG_SUCCEED = "GETMSG_SUCCEED";
const GETMSG_FAILED = "GETMSG_FAILED";

export {
  SENDMSG,
  SENDMSG_SUCCEED,
  SENDMSG_FAILED,
  GETMSG,
  GETMSG_SUCCEED,
  GETMSG_FAILED,
};

interface SendMsgAction {
  type: typeof SENDMSG;
  payload: {
    email: string;
    message: string;
  };
}

interface SendMsgSuccessAction {
  type: typeof SENDMSG_SUCCEED;
  payload: {
    email: string;
    message: string;
    docKey: string;
  };
}
interface SendMsgFailAction {
  type: typeof SENDMSG_FAILED;
  payload: {
    errorMsg: string;
  };
}
export type SendMsgActionTypes =
  | SendMsgAction
  | SendMsgSuccessAction
  | SendMsgFailAction;

interface GetMsgAction {
  type: typeof GETMSG;
  payload: {
    email: string;
  };
}
interface GetMsgSuccessAction {
  type: typeof GETMSG_SUCCEED;
  payload: {
    email: string;
    messages: {};
  };
}
interface GetMsgFailAction {
  type: typeof GETMSG_FAILED;
  payload: {
    errorMsg: string;
  };
}
export type GetMsgActionTypes =
  | GetMsgAction
  | GetMsgSuccessAction
  | GetMsgFailAction;

export interface MessageReducer {
  errorMsg: string;
  chats: {
    [user: string]: {
      messages: {};
    };
  };
}

/**
 * Action types listen by Saga
 */
const GETUSER = "GETUSER";
const ADDFRIEND = "ADDFRIEND";
const DELFRIEND = "DELFRIEND";

/**
 * Action types listen by Reducer
 */
const RESET = "REST";
const GETUSER_SUCCESS = "GETUSER_SUCCESS";
const GETUSER_FAIL = "GETUSER_FAIL";
const ADDFRIEND_SUCCESS = "ADDFRIEND_SUCCESS";
const ADDFRIEND_FAIL = "ADDFRIEND_FAIL";
const DELFRIEND_SUCCESS = "DELFRIEND_SUCCESS";
const DELFRIEND_FAIL = "DELFRIEND_FAIL";

export {
  RESET,
  GETUSER,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  ADDFRIEND,
  ADDFRIEND_SUCCESS,
  ADDFRIEND_FAIL,
  DELFRIEND,
  DELFRIEND_SUCCESS,
  DELFRIEND_FAIL,
};
interface ResetAction {
  type: typeof RESET;
}
interface GetUserAction {
  type: typeof GETUSER;
  payload: {
    keyword: string;
  };
}

interface GetUserSuccessAction {
  type: typeof GETUSER_SUCCESS;
  payload: {
    email: string;
    // avatar: string;
    displayName: string;
  };
}
interface GetUserFailAction {
  type: typeof GETUSER_FAIL;
  payload: {
    errorMsg: string;
  };
}
interface AddFriendAction {
  type: typeof ADDFRIEND;
  payload: {
    sender: string;
    receiver: string;
    msg: string;
  };
}
interface AddFriendSuccessAction {
  type: typeof ADDFRIEND_SUCCESS;
  payload: {
    email: string;
  };
}
interface AddFriendFailAction {
  type: typeof ADDFRIEND_FAIL;
  payload: {
    errorMsg: string;
  };
}
interface DelFriendAction {
  type: typeof DELFRIEND;
  payload: {
    email: string;
  };
}
interface DelFriendSuccessAction {
  type: typeof DELFRIEND_SUCCESS;
  paylaod: {
    email: string;
  };
}
interface DelFriendFailAction {
  type: typeof DELFRIEND_FAIL;
  payload: {
    errorMsg: string;
  };
}

export type GetUserActionTypes =
  | ResetAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailAction;
export type AddFriendActionTypes =
  | AddFriendAction
  | AddFriendSuccessAction
  | AddFriendFailAction;

export type DelFriendActionTypes =
  | DelFriendAction
  | DelFriendSuccessAction
  | DelFriendFailAction;

export interface RequestReducer {
  errorMsg: string;
  users: { email: string; displayName: string }[];
}

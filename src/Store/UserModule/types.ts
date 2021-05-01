/**
 * Action types listen by Saga
 */
const GETAVATAR = "GETAVATAR";
const GETPROFILE = "GETPROFILE";
const GETMESSAGE = "GETMESSAGE";

/**
 * Action types listen by Reducer
 */
const GETAVATAR_SUCCEED = "GETAVATAR_SUCCEED";
const GETAVATAR_FAILED = "GETAVATAR_FAILED";

const GETPROFILE_SUCCEED = "GETPROFILE_SUCCEED";
const GETPROFILE_FAILED = "GETPROFILE_FAILED";

const GETMESSAGE_SUCCEED = "GETMESSAGE_SUCCEED";
const GETMESSAGE_FAILED = "GETMESSAGE_FAILED";

export {
  GETAVATAR,
  GETPROFILE,
  GETMESSAGE,
  GETAVATAR_SUCCEED,
  GETAVATAR_FAILED,
  GETPROFILE_SUCCEED,
  GETPROFILE_FAILED,
  GETMESSAGE_SUCCEED,
  GETMESSAGE_FAILED,
};
/**
 * This action will dispatch an Get Avatar action with the payload to saga
 */
interface GetAvatarAction {
  type: typeof GETAVATAR;
  payload: {
    email: string;
  };
}

/**
 * This action will dispatch an Get Avatar SUCCESS action with the payload to saga
 */
interface GetAvatarSuccessAction {
  type: typeof GETAVATAR_SUCCEED;
  payload: {
    avatar: string;
  };
}
/**
 * This action will dispatch an Get Avatar Fail action with the payload to saga
 */
interface GetAvatarFailAction {
  type: typeof GETAVATAR_FAILED;
  payload: {
    errorMsg: string;
  };
}
export type GetAvatarActionTypes =
  | GetAvatarAction
  | GetAvatarSuccessAction
  | GetAvatarFailAction;

interface GetProfileAction {
  type: typeof GETPROFILE;
  payload: {
    email: string;
  };
}
interface GetProfileSuccessAction {
  type: typeof GETPROFILE_SUCCEED;
  payload: {
    displayName: string;
    gender: string;
    description: string;
    birthday: string;
  };
}
interface GetProfileFailAction {
  type: typeof GETPROFILE_FAILED;
  payload: {
    errorMsg: string;
  };
}
export type GetProfileActionTypes =
  | GetProfileAction
  | GetProfileSuccessAction
  | GetProfileFailAction;

interface GetMessageAction {
  type: typeof GETMESSAGE;
  payload: {
    email: string;
  };
}
interface GetMessageSuccessAction {
  type: typeof GETMESSAGE_SUCCEED;
  payload: {
    messages: object;
  };
}
interface GetMessageFailAction {
  type: typeof GETMESSAGE_FAILED;
  payload: {
    errorMsg: string;
  };
}
export type GetMessageActionTypes =
  | GetMessageAction
  | GetMessageSuccessAction
  | GetMessageFailAction;

export type UserProfileActiontypes =
  | GetMessageActionTypes
  | GetProfileActionTypes
  | GetAvatarActionTypes;

export interface UserProfileReducer {
  email: string;
  avatar: string;
  messages: object;
  displayName: string;
  gender: string;
  description: string;
  birthday: string;
  errorMsg: string;
}

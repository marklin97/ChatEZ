/**
 * Action types listen by Saga
 */
const GETAVATAR = "GETAVATAR";
const GETPROFILE = "GETPROFILE";
const GETFRIENDS = "GETFRIENDS";
/**
 * Action types listen by Reducer
 */
const GETAVATAR_SUCCEED = "GETAVATAR_SUCCEED";
const GETAVATAR_FAILED = "GETAVATAR_FAILED";

const GETPROFILE_SUCCEED = "GETPROFILE_SUCCEED";
const GETPROFILE_FAILED = "GETPROFILE_FAILED";

export {
  GETAVATAR,
  GETPROFILE,
  GETFRIENDS,
  GETAVATAR_SUCCEED,
  GETAVATAR_FAILED,
  GETPROFILE_SUCCEED,
  GETPROFILE_FAILED,
};

interface GetFriendsAction {
  type: typeof GETFRIENDS;
  payload: {
    email: string;
  };
}
/**
 * This action will dispatch an GET AVATAR action with the payload to saga
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
    email: string;
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
    email: string;
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

export interface FriendReducer {
  errorMsg: string;
  friends: {
    [friend: string]: {
      profile: {
        avatar?: string;
        displayName?: string;
        gender?: string;
        description?: string;
        birthday?: string;
      };
    };
  };
}

export type GetProfileActionTypes =
  | GetProfileAction
  | GetProfileSuccessAction
  | GetProfileFailAction;

export type FriendProfileActionTypes =
  | GetProfileActionTypes
  | GetAvatarActionTypes
  | GetFriendsAction;

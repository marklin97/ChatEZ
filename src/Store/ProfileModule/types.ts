/**
 * Action types listen by Saga
 */
const GETAVATAR = "GETAVATAR";
const GETPROFILE = "GETPROFILE";
const GETUSERS = "GETUSERS";
const UPDATEPROFILE = "UPDATEPROFILE";
const RESET = "RESET";

/**
 * Action types listen by Reducer
 */
const GETAVATAR_SUCCEED = "GETAVATAR_SUCCEED";
const GETAVATAR_FAILED = "GETAVATAR_FAILED";

const GETPROFILE_SUCCEED = "GETPROFILE_SUCCEED";
const GETPROFILE_FAILED = "GETPROFILE_FAILED";

const UPDATEPROFILE_SUCCEED = "UPDATEPROFILE_SUCCEED";
const UPDATEPROFILE_FAIL = "UPDATEPROFILE_FAIL";

export {
  RESET,
  GETAVATAR,
  GETPROFILE,
  GETUSERS,
  UPDATEPROFILE,
  GETAVATAR_SUCCEED,
  GETAVATAR_FAILED,
  GETPROFILE_SUCCEED,
  GETPROFILE_FAILED,
  UPDATEPROFILE_SUCCEED,
  UPDATEPROFILE_FAIL,
};
interface ResetAction {
  type: typeof RESET;
}
interface GetUsersAction {
  type: typeof GETUSERS;
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

export type GetProfileActionTypes =
  | GetProfileAction
  | GetProfileSuccessAction
  | GetProfileFailAction;

interface UpdateProfileAction {
  type: typeof UPDATEPROFILE;
  payload: {
    email?: string;
    imgFile?: File;
    gender?: string;
    description?: string;
    birthday?: string;
  };
}
interface UpdateProfileSuccessAction {
  type: typeof UPDATEPROFILE_SUCCEED;
  payload: {
    email?: string;
    avatar?: string;
    gender?: string;
    description?: string;
    birthday?: string;
  };
}
interface UpdateProfileFailAction {
  type: typeof UPDATEPROFILE_FAIL;
  payload: {
    errorMsg: string;
  };
}
export type UpdateProfileActionTypes =
  | UpdateProfileAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailAction
  | ResetAction;

export type UserProfileActionTypes =
  | GetProfileActionTypes
  | GetAvatarActionTypes
  | UpdateProfileActionTypes
  | GetUsersAction;

export interface ProfileReducer {
  errorMsg: string;
  imgFile: any;
  updateSuccess: boolean | null;
  users: {
    [user: string]: {
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

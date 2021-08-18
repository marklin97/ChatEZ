import * as types from "./types";
const initState: types.RequestReducer = {
  errorMsg: "",
  users: [],
};
export default (
  state = initState,
  action:
    | types.AddFriendActionTypes
    | types.GetUserActionTypes
    | types.DelFriendActionTypes
): types.RequestReducer => {
  switch (action.type) {
    case types.RESET:
      return {
        errorMsg: "",
        users: [],
      };

    case types.GETUSER_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          {
            email: action.payload.email,
            displayName: action.payload.displayName,
          },
        ],
      };

    default:
      return state;
  }
};

import { combineReducers } from "redux";
import LoginReducer from "./LoginModule/reducer";
import SignUpReducer from "./SignUpModule/reducer";
import UserReducer from "./UserModule/reducer";
import FriendReducer from "./FriendModule/reducer";
// import demoReducer from './moduleA/reducer';

// combine all the reducer in here
const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  signUpReducer: SignUpReducer,
  userReducer: UserReducer,
  friendReducer: FriendReducer,
});
// export the root reducer state
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

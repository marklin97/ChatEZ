import { combineReducers } from "redux";
import LoginReducer from "./LoginModule/reducer";
import SignUpReducer from "./SignUpModule/reducer";
import UserReducer from "./UserModule/reducer";
// import demoReducer from './moduleA/reducer';

// combine all the reducer in here
const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  signUpReducer: SignUpReducer,
  userProfileReducer: UserReducer,
});
// export the root reducer state
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

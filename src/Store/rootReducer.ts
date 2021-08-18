import { combineReducers } from "redux";
import LoginReducer from "./LoginModule/reducer";
import SignUpReducer from "./SignUpModule/reducer";
import ProfileReducer from "./ProfileModule/reducer";
import RequestReducer from "./RequestModule/reducer";
// combine all the reducer in here
const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  signUpReducer: SignUpReducer,
  requestReducer: RequestReducer,
  profileReducer: ProfileReducer,
});
// export the root reducer state
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

import { all } from "redux-saga/effects";
import LoginSagas from "./LoginModule/sagas";
import SignUpSagas from "./SignUpModule/sagas";
import ProfileSagas from "./UserModule/sagas";
export default function* rootSaga(): Generator {
  try {
    yield all([...LoginSagas, ...SignUpSagas, ...ProfileSagas]);
  } catch (err) {
    // This is where error monitoring should go
    console.log("error caught in rootsaga::", err);
  }
}

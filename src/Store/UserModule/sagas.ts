import * as types from "./types";
import * as actions from "./actions";
import firebase from "firebase";
import { put, fork, takeEvery, call } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
/**
 * This is an action handles user get avatar request
 * */
function* handleGetAvatar(action) {
  try {
    // Create a root reference
    const storageRef = firebase.storage().ref();
    // Create a reference to user avatar file
    const ref = storageRef.child(`Avatars/${action.payload.email}`);
    const config: AxiosRequestConfig = {
      responseType: "blob",
    };
    const url = yield call(() => ref.getDownloadURL());
    const response = yield call(axios.get, url, config);
    yield put(
      actions.getAvatarSuccessAction(URL.createObjectURL(response.data))
    );
  } catch (error) {
    yield put(actions.getAvatarFailAction(error.message));
  }
}
// ref.getDownloadURL().then((url) => {
//   const config: AxiosRequestConfig = {
//     responseType: "blob",
//   };
//   const response = axios.get(url, config);
//   console.log(response);
// });
/**
 * This is an watcher function listen for LOGIN,LOGOUT and LOGIN_TOKEN actions
 * */
function* watchAsynAction() {
  yield takeEvery(types.GETAVATAR, handleGetAvatar);
  // yield takeEvery(types.LOGIN, handleUserLogin);
  // yield takeEvery(types.LOGOUT, handleUserLogout);
  // yield takeEvery(types.LOGIN_THIRDPARTY, handleThirdPtyLogin);
  // yield takeEvery(types.LOGIN_TOKEN, handleUserToken);
}

const sagas = [fork(watchAsynAction)];
export default sagas;

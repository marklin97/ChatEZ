import * as types from "./types";
import * as actions from "./actions";
import firebase from "firebase";
import { put, fork, takeEvery, call } from "redux-saga/effects";
/**
 * This is an action handles users login request
 * */
function* handleUserLogin(action) {
  try {
    const auth = firebase.auth();
    yield call(
      [auth, auth.signInWithEmailAndPassword],
      action.payload.userName,
      action.payload.password
    );
    yield put(actions.userLoginSuccessAction());
    window.location.href = "/dashboard";
  } catch (error) {
    yield put(actions.userLoginFailAction());
  }
}
/**
 * This is an action handles login request from third party login
 * For Facebook & Google users
 * */
function* handleThirdPtyLogin(action) {
  yield call(initWelcomeMsg, action);
}
/**
 * This is an action handles users logout request
 * */
function* handleUserLogout() {
  try {
    const auth = firebase.auth();
    yield call([auth, auth.signOut]);
    yield put(actions.userLogoutSuccessAction());
  } catch (error) {
    yield put(actions.userLogoutFailedAction());
  }
}

/**
 * This is an action validates user's existing token
 * */
function* handleUserToken() {
  try {
    // retrieve and validate user token from local storage
    yield put(actions.userLoginSuccessAction());
  } catch {
    yield put(actions.userLogoutFailedAction());
  }
}
/**
 * This is an function initiate a welcome message for the new user
 * */
function* initWelcomeMsg(action) {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(action.payload.userProfile.email);
    userRef.get().then((snapShot) => {
      if (!snapShot.exists) {
        userRef.set(action.payload.userProfile);
        const buildDocKey = [
          action.payload.userProfile.email,
          "admin@portexe.com",
        ]
          .sort()
          .join(":");
        firebase
          .firestore()
          .collection("chats")
          .doc(buildDocKey)
          .set({
            messages: firebase.firestore.FieldValue.arrayUnion({
              sender: "Admin@portexe.com",
              message: "It is our great pleasure to have you on board! ",
              timeStamp: Date.now(),
            }),
            users: [action.payload.userProfile.email, "admin@portexe.com"],
            receiverHasRead: false,
          })
          // this prevents redirection before the conversation gets init.
          .then(() => {
            window.location.href = "/dashboard";
          });
      } else {
        window.location.href = "/dashboard";
      }
    });
  } catch (err) {
    yield put(actions.userLoginFailAction());
  }
}

/**
 * This is an watcher function listen for LOGIN,LOGOUT and LOGIN_TOKEN actions
 * */
function* watchAsynAction() {
  yield takeEvery(types.LOGIN, handleUserLogin);
  yield takeEvery(types.LOGOUT, handleUserLogout);
  yield takeEvery(types.LOGIN_THIRDPARTY, handleThirdPtyLogin);
  yield takeEvery(types.LOGIN_TOKEN, handleUserToken);
}

const sagas = [fork(watchAsynAction)];
export default sagas;

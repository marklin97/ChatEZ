import * as types from "./types";
import * as actions from "./actions";
import firebase from "firebase";
import { put, fork, takeEvery, call } from "redux-saga/effects";
function* handleUserSignUp(action) {
  try {
    const auth = firebase.auth();
    const { email, displayName, password } = action.payload;
    yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    yield call(initUserProfile, email, displayName);
    yield call(initWelcomeMsg, email);
    yield put(actions.SignUpSuccessAction());
  } catch (error) {
    yield put(actions.SignUpFailAction(error.message));
  }
}

function* initUserProfile(email: string, displayName: string) {
  try {
    const userObject = {
      email: email,
      emailVerified: false,
      displayName: displayName,
      gender: "male",
      birthday: "",
      description: "",
    };
    firebase.firestore().collection("users").doc(email).set(userObject);
  } catch (error) {
    yield put(actions.SignUpFailAction(error.message));
  }
}
function* initWelcomeMsg(email: string) {
  try {
    const buildDocKey = [email, "admin@portexe.com"].join(":");
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
        users: [email, "admin@portexe.com"],
        receiverHasRead: false,
      });
  } catch (error) {
    yield put(actions.SignUpFailAction(error.message));
  }
}

/**
 * This is an watcher function listen for LOGIN,LOGOUT and LOGIN_TOKEN actions
 * */
function* watchAsynAction() {
  yield takeEvery(types.SIGNUP, handleUserSignUp);
}
const sagas = [fork(watchAsynAction)];
export default sagas;

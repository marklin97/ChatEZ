import * as types from "./types";
import * as actions from "./actions";
import firebase from "firebase";
import { put, fork, takeEvery, call, take, all } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { eventChannel } from "redux-saga";
/**
 * This is an action handles user GET avatar request
 * */

function* handleGetAvatar(action) {
  try {
    // Create a root reference to storage
    const storageRef = firebase.storage().ref();
    // Create a reference to user avatar file
    const ref = storageRef.child(`Avatars/${action.payload.email}`);
    const config: AxiosRequestConfig = {
      responseType: "blob",
    };
    const url = yield call(() => ref.getDownloadURL());
    const response = yield call(axios.get, url, config);

    yield put(
      actions.getAvatarSuccessAction(
        action.payload.email,
        URL.createObjectURL(response.data)
      )
    );
  } catch (error) {
    yield put(actions.getAvatarFailAction(error.message));
  }
}

/**
 * This is an action handles user GET profile request
 * */
function* handleGetProfile(action) {
  try {
    const ref = firebase
      .firestore()
      .collection("users")
      .where("email", "==", action.payload.email);
    const channel = eventChannel((emit) => ref.onSnapshot(emit));
    const data = yield take(channel);
    const profile = data.docs.map((doc) => doc.data());
    const { displayName, gender, birthday, description } = profile[0];
    yield put(
      actions.getProfileSuccessAction(
        action.payload.email,
        displayName,
        birthday,
        gender,
        description
      )
    );
  } catch (error) {
    console.log(error.message);
    yield put(actions.getProfileFailAction(error.message));
  }
}

function* handleGetFriends(action) {
  try {
    const ref = firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", action.payload.email);

    const channel = eventChannel((emit) => ref.onSnapshot(emit));
    const data = yield take(channel);
    const conversation = data.docs.map((doc) => doc.data().users);
    const friendEmails = conversation.map(
      (users) => users.filter((user) => user !== action.payload.email)[0]
    );

    yield all(
      friendEmails.map((email) => {
        return put(actions.getAvatarAction(email));
      })
    );

    yield all(
      friendEmails.map((email) => {
        return put(actions.getProfileAction(email));
      })
    );
  } catch (error) {
    console.log(error);
  }
}

/**
 * This is an watcher function listen for LOGIN,LOGOUT and LOGIN_TOKEN actions
 * */
function* watchAsynAction() {
  yield takeEvery(types.GETFRIENDS, handleGetFriends);
  yield takeEvery(types.GETPROFILE, handleGetProfile);
  yield takeEvery(types.GETAVATAR, handleGetAvatar);
}

const sagas = [fork(watchAsynAction)];
export default sagas;

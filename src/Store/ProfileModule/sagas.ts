import * as types from "./types";
import * as actions from "./actions";
import firebase from "firebase";
import { put, fork, takeEvery, call, take, all } from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
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
  console.log(action.payload.email);
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

function* handleGetUsers(action) {
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
    friendEmails.push(action.payload.email);
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
const handleImgEncode = async (file: File) => {
  if (file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  } else return null;
};
/**
 * This is an action handles user UPDATE avatar request
 * */
function* handleUpdateProfile(action) {
  const { imgFile, email, gender, description, birthday } = action.payload;

  try {
    // Create a root reference to storage
    const storageRef = firebase.storage().ref();
    // Create a reference to user avatar file
    const avatarRef = storageRef.child(`Avatars/${email}`);
    const profileRef = firebase
      .firestore()
      .collection("users")
      .doc(action.payload.email);
    // Update user avatar
    if (imgFile) {
      yield call(() => avatarRef.put(imgFile));
    }
    // Convert img file into avatar (string form)
    const avatar = yield call(handleImgEncode, imgFile);
    // Update user profile in db
    const profile = {
      email: email,
      gender: gender,
      description: description,
      birthday: birthday,
    };
    yield call(() => profileRef.set(profile, { merge: true }));

    // If no error, dispatch SUCCESS action with the payload to reducer
    yield put(
      actions.updateProfileSuccessAction(
        email,
        avatar,
        gender,
        description,
        birthday
      )
    );
  } catch (error) {
    yield put(actions.updateProfileFailAction(error.message));
  }
}

/**
 * This is an watcher function listen for LOGIN,LOGOUT and LOGIN_TOKEN actions
 * */
function* watchAsynAction() {
  yield takeEvery(types.GETUSERS, handleGetUsers);
  yield takeEvery(types.GETPROFILE, handleGetProfile);
  yield takeEvery(types.GETAVATAR, handleGetAvatar);
  yield takeEvery(types.UPDATEPROFILE, handleUpdateProfile);
}

const sagas = [fork(watchAsynAction)];
export default sagas;

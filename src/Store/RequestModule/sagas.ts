import * as types from "./types";
import * as actions from "./actions";
import firebase from "firebase";
import { put, fork, takeEvery, call, all } from "redux-saga/effects";
const getUser = async (keyword: string) => {
  keyword = keyword.toLocaleLowerCase();
  const ref = firebase
    .firestore()
    .collection("users")
    .where("email", ">=", keyword)
    .where("email", "<=", keyword + "\uf8ff")
    .limit(15);

  return ref.get().then((res) => {
    return res.docs.map((doc) => ({
      email: doc.data().email,
      displayName: doc.data().displayName,
    }));
  });
};
/**
 * This is an action handles Get (Search) user request
 * */
function* handleGetUser(action) {
  try {
    const res = yield call(getUser, action.payload.keyword);
    if (res) {
      yield all(
        res.map((user) => {
          if (user.email !== firebase.auth().currentUser.email) {
            return put(
              actions.getUserSuccessAction(user.email, user.displayName)
            );
          } else {
            return null;
          }
        })
      );
    } else {
      yield put(actions.getUserFailAction("Not Found"));
    }
  } catch (err) {
    console.log(err);
  }
}
function* initChat(sender: string, receiver: string, msg: string) {
  const buildDocKey = [sender, receiver].sort().join(":");
  try {
    firebase
      .firestore()
      .collection("chats")
      .doc(buildDocKey)
      .set({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: sender,
          message: msg,
          timeStamp: Date.now(),
        }),
        users: [receiver, sender],
        receiverHasRead: false,
      });
  } catch {
    yield put(actions.addFriendFailAction("Failed to initiate conversation"));
  }
}
/**
 * This is an action handles add friend request
 * */
function* handleAddFriend(action) {
  try {
    initChat(
      action.payload.sender,
      action.payload.receiver,
      action.payload.msg
    );
    const { sender, receiver, msg } = action.payload;
    console.log(receiver);
    yield call(initChat, sender, receiver, msg);
    yield put(actions.addFriendSuccessAction("Friend Add"));
  } catch (error) {
    yield put(actions.addFriendFailAction("Failed to add friend"));
  }
}

/**
 * This is an watcher function listen for LOGIN,LOGOUT and LOGIN_TOKEN actions
 * */
function* watchAsynAction() {
  yield takeEvery(types.GETUSER, handleGetUser);
  yield takeEvery(types.ADDFRIEND, handleAddFriend);
}

const sagas = [fork(watchAsynAction)];
export default sagas;

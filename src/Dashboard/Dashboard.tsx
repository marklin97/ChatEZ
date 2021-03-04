import React, { useState, useEffect } from "react";
import ChartList from "../ChatList/ChartList";
import ChatView from "../ChatView/ChatView";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import Styles from "./Dashboard.module.css";
import { timeStamp } from "console";

interface chatState {
  selectedChat: number | null;
  newChatFormVisible: boolean;
  email: String | null;
  chats: firebase.firestore.DocumentData[] | null;
}

const Dashboard = () => {
  const [chatState, setChatState] = useState<chatState>({
    selectedChat: null,
    newChatFormVisible: false,
    email: "",
    chats: null,
  });

  const newChatBtnClick = () => {
    setChatState({
      ...chatState,
      newChatFormVisible: true,
      selectedChat: null,
    });
  };
  const selectChat = (chatIndex) => {
    console.log(chatIndex);
    setChatState({ ...chatState, selectedChat: chatIndex });
  };
  // generate string in the form of user1 (send message) : user 2
  const buildDocKey = (friend) => [chatState.email, friend].sort().join(":");
  const submitMessageFn = (msg) => {
    const docKey = buildDocKey(
      chatState.chats[chatState.selectedChat].users.filter(
        (_usr) => _usr !== chatState.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: chatState.email,
          message: msg,
          timeStamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "/login";
      } else {
        firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", user.email)
          .onSnapshot((res) => {
            let chats = res.docs.map((doc) => doc.data());
            setChatState({
              ...chatState,
              chats: chats,
              email: user.email,
            });
          });
      }
    });
  }, []);
  return (
    <div className={Styles.container}>
      <ChartList
        newChatBtnFn={newChatBtnClick}
        selectChatFn={selectChat}
        userEmail={chatState.email}
        chats={chatState.chats}
        selectedChat={chatState.selectedChat}
      />
      {chatState.chats ? (
        chatState.newChatFormVisible ? null : (
          <div>
            <ChatView
              user={chatState.email}
              chat={chatState.chats[chatState.selectedChat]}
              submitMessageFn={submitMessageFn}
            />
          </div>
        )
      ) : null}
      {/* <Button className={Styles.signOutBtn}> Sign Out</Button> */}
    </div>
  );
};

export default Dashboard;

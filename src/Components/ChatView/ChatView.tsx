/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Styles from "./ChatView.module.scss";
import ChatTextBox from "../ChatTextBox/ChatTextBox";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface ChatViewProps {
  user: String;
  chat: firebase.firestore.DocumentData;
  submitMessageFn(msg): any;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const ChatView: React.FC<ChatViewProps> = ({ user, chat, submitMessageFn }) => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook is invoked every time user visits the page
   *  This hook scroll down the conversation to the latest message
   * */
  useEffect(() => {
    // auto scroll down to the latest message
    const container = document.getElementById("chatView-container");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [chat]);
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
  /*
   */
  if (chat === undefined) {
    return null;
  } else {
    return (
      <div className={Styles.container}>
        <div className={Styles.chat_header}>
          <span className={Styles.user_name}>
            {chat.users.filter((users) => users !== user)}{" "}
          </span>
        </div>

        <div className={Styles.conversation} id="chatView-container">
          <div className={Styles.spacing}></div>
          {chat.messages.map((msg, index) => {
            return (
              <div key={index}>
                <div
                  key={index}
                  className={
                    msg.sender === user
                      ? Styles.user_message
                      : Styles.friend_message
                  }
                >
                  <span className={Styles.message_text}>{msg.message}</span>
                </div>
              </div>
            );
          })}
        </div>
        <ChatTextBox submitMessageFn={submitMessageFn} />
      </div>
    );
  }
};

export default ChatView;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

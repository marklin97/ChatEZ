/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Styles from "./ChatView.module.scss";
import ChatTextBox from "../ChatTextBox/ChatTextBox";
import UserAvatar from "../UserAvatar/UserAvatar";
import { IconButton, Link } from "@material-ui/core";
import UserCard from "../UserCard/UserCard";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface ChatViewProps {
  user: string;
  chat: firebase.firestore.DocumentData;
  submitMessageFn(msg): any;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const ChatView: React.FC<ChatViewProps> = ({ user, chat, submitMessageFn }) => {
  const friendEmail = chat
    ? chat.users.filter((users) => users !== user)[0]
    : "";
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <UserCard
          open={open}
          userEmail={friendEmail}
          handleClose={handleClose}
        />
        <div className={Styles.header}>
          <Link onClick={handleClick}>
            <span className={Styles.header_username}>
              {chat.users.filter((users) => users !== user)}{" "}
            </span>
          </Link>
        </div>

        <div className={Styles.chatView} id="chatView-container">
          <div className={Styles.chatView_spacing}></div>
          {chat.messages.map((msg, index) => {
            return (
              <div key={index}>
                {msg.sender === user ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className={Styles.chatView_userMsg}>
                      <span className={Styles.message_text}>{msg.message}</span>
                    </div>

                    <div className={Styles.chatView_userAvatar}>
                      <IconButton style={{ padding: "0px" }}>
                        <UserAvatar userEmail={user} />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <div className={Styles.chatView_friendAvatar}>
                      <IconButton
                        style={{ padding: "0px" }}
                        onClick={handleClick}
                      >
                        <UserAvatar userEmail={friendEmail} />
                      </IconButton>
                    </div>
                    <div className={Styles.chatView_friendMsg}>
                      <span className={Styles.message_text}>{msg.message}</span>
                    </div>
                  </div>
                )}
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

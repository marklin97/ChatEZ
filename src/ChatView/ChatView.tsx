import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Styles from "./ChatView.module.css";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import ChatTextBox from "../ChatTextBox/ChatTextBox";
interface ChatViewProps {
  user: String;
  chat: firebase.firestore.DocumentData;
  submitMessageFn(msg): any;
}

const ChatView: React.FC<ChatViewProps> = ({ user, chat, submitMessageFn }) => {
  const [btnColor, setBtnColor] = useState({
    chatIcon: "#00c1ff",
    detailIcon: "",
  });
  const [currentChat, setCurrentChat] = useState(chat);
  useEffect(() => {
    // auto scroll down to the latest message
    const container = document.getElementById("chatView-container");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [chat]);

  // Toggle the icon once clicked
  const onChatClick = () => {
    console.log(currentChat);
    setBtnColor({ chatIcon: "#00c1ff", detailIcon: "" });
  };
  const onDetailClick = () => {
    setBtnColor({ chatIcon: "", detailIcon: "#00c1ff" });
  };

  if (chat === undefined) {
    return null;
  } else {
    return (
      <div className={Styles.container}>
        <div className={Styles.chatHeader}>
          <button
            className={Styles.btn}
            style={{ color: btnColor.chatIcon }}
            onClick={onChatClick}
          >
            <ChatRoundedIcon fontSize="large" className={Styles.iconBtn} />
          </button>
          <button
            className={Styles.btn}
            style={{ color: btnColor.detailIcon }}
            onClick={onDetailClick}
          >
            <FaceTwoToneIcon fontSize="large" className={Styles.iconBtn} />
          </button>

          {/* Your conversation with{" "}
                {chat.users.filter((users) => users !== user)} */}
        </div>
        <div className={Styles.conversation} id="chatView-container">
          {chat.messages.map((msg, index) => {
            return (
              <div key={index}>
                <div
                  key={index}
                  className={
                    msg.sender === user ? Styles.userSent : Styles.friendSent
                  }
                >
                  {msg.message}
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

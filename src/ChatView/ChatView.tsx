import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Styles from "./ChatView.module.css";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
interface ChatViewProps {
  user: String;
  chat: firebase.firestore.DocumentData;
}

const ChatView: React.FC<ChatViewProps> = ({ user, chat }) => {
  const [btnColor, setBtnColor] = useState({
    chatIcon: "#00c1ff",
    detailIcon: "",
  });
  useEffect(() => {
    // auto scroll down to the latest message
    const container = document.getElementById("chatView-container");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [chat]);

  const onChatClick = () => {
    setBtnColor({ chatIcon: "#00c1ff", detailIcon: "" });
  };
  const onDetailClick = () => {
    setBtnColor({ chatIcon: "", detailIcon: "#00c1ff" });
  };

  if (chat === undefined) {
    return null;
  } else {
    return (
      <div className={Styles.container} id="chatView-container">
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
          <button className={Styles.btn}>
            <AspectRatioIcon fontSize="large" className={Styles.expandBtn} />
          </button>
          {/* Your conversation with{" "}
                {chat.users.filter((users) => users !== user)} */}
        </div>
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
    );
  }
};

export default ChatView;

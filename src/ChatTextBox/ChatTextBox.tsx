import React, { useState } from "react";
import Styles from "./ChatTextBox.module.css";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
interface ChatTextBoxProps {
  submitMessageFn(msg): any;
}
const ChatTextBox: React.FC<ChatTextBoxProps> = ({ submitMessageFn }) => {
  const [chatText, setChatText] = useState("");

  const messageValid = (text) => text && text.replace(/\s/g, "").length;

  const submitMessage = () => {
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      setChatText("");
      (document.getElementById("chattextbox") as HTMLInputElement).value = "";
    }
  };
  const userTyping = (e) => {
    e.keyCode === 13 ? submitMessage() : setChatText(e.target.value);
  };

  return (
    <div className={Styles.chatTextBoxContainer}>
      <TextField
        id="chattextbox"
        multiline
        rows={7}
        className={Styles.chatTextBox}
        placeholder="Type your message"
        onKeyUp={(e) => userTyping(e)}
      ></TextField>
      <Send
        className={Styles.sendBtn}
        style={{ transition: "0.5s" }}
        onClick={submitMessage}
        fontSize="large"
      ></Send>
    </div>
  );
};

export default ChatTextBox;

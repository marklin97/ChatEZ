/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import Styles from "./ChatTextBox.module.scss";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface ChatTextBoxProps {
  submitMessageFn(msg): any;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ChatTextBox: React.FC<ChatTextBoxProps> = ({ submitMessageFn }) => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the current input in text box
   * */
  const [chatText, setChatText] = useState("");
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is a function validate user input message before sent
   * */
  const messageValid = (text) => text && text.replace(/\s/g, "").length;
  /**
   * This function stores the sent message to the database,
   * and clears the current input box
   * */
  const submitMessage = () => {
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      setChatText("");
      (document.getElementById("chatTextbox") as HTMLInputElement).value = "";
    }
  };
  /**
   * This is a function to handle ENTER KEY stroke for sending the message
   * */
  const userTyping = (e) => {
    e.keyCode === 13 ? submitMessage() : setChatText(e.target.value);
  };
  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div className={Styles.chatBox}>
      <TextField
        id="chatTextbox"
        multiline
        rows={4}
        InputProps={{ disableUnderline: true }}
        placeholder="Type your message"
        onKeyUp={(e) => userTyping(e)}
      ></TextField>
      <Send
        className={Styles.chatBox_submitBtn}
        style={{ transition: "0.5s" }}
        onClick={submitMessage}
        fontSize="large"
      ></Send>
    </div>
  );
};

export default ChatTextBox;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

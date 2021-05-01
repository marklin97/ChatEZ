/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect, useRef } from "react";
import FriendList from "../../Components/FriendList/FriendList";
import ChatView from "../../Components/ChatView/ChatView";
import firebase from "firebase";
import Styles from "./Dashboard.module.scss";
import { timeStamp } from "console";
import Grid from "@material-ui/core/Grid";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */

interface chatState {
  selectedChat: number | null;
  email: string | null;
  chats: firebase.firestore.DocumentData[] | null;
}
interface userProfile {
  displayName: string;
  description: string;
  birthday: string;
  gender: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Dashboard = (): JSX.Element => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the current selected index of user's chat list
   * */
  const chatIndex = useRef(0);
  /**
   *  This state will be handled by the redux in the future
   * */
  const [chatState, setChatState] = useState<chatState>({
    selectedChat: chatIndex.current,
    email: "",
    chats: null,
  });
  // Destructure of chatState
  const { selectedChat, email, chats } = chatState;
  /**
   *  This state will be handled by the redux in the future
   * */
  const [userProfile, setUserProfile] = useState<userProfile>({
    displayName: "",
    birthday: "",
    gender: "",
    description: "",
  });

  // Destructure of userProfile
  const { displayName, birthday, gender, description } = userProfile;

  /**
   * This is a hook to retrieve user's profile & friend list when authorized user visits the page
   * */
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // redirect unauthorized user to the login page
      if (!user) {
        window.location.href = "/login";
      } else {
        let email = user.email;
        // only for facebook users
        if (email == null) {
          email = user.providerData[0].uid + "@" + "facebook.com";
        }
        // retrieve user profile data
        getUserProfile(email);
        // retrieve history ages
        getHistoryMsg(email);
      }
    });
  }, []);

  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
  /*
  /*

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/

  /**
   * This is a function to handle user's selection of friend list
   * */
  const selectChat = (index) => {
    chatIndex.current = index;
    setChatState({ ...chatState, selectedChat: index });
  };
  /**
   * This is a function to handle user's operation for sending message to other
   * This function will be handle by the saga in the future
   * */
  const getUserProfile = async (email: string) => {
    await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .onSnapshot(async (res) => {
        let profile = res.docs.map((doc) => doc.data());
        setUserProfile({
          ...userProfile,
          displayName: profile[0].displayName,
          gender: profile[0].gender,
          birthday: profile[0].birthday,
          description: profile[0].description,
        });
      });
  };
  /**
   * This is a function to retrieve user's involved conversation and past message
   * This function will be handle by the saga in the future
   * */

  const getHistoryMsg = async (email) => {
    await firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", email)
      .onSnapshot(async (res) => {
        let chats = res.docs.map((doc) => doc.data());

        setChatState({
          ...chatState,
          chats: chats,
          email: email,
          selectedChat: chatIndex.current,
        });
      });
  };
  /**
   * This is a function to add new message to the database.
   * This function will be handle by the saga in the future
   * */
  const updateConversation = async (
    docKey: string,
    email: string,
    msg: string
  ) => {
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timeStamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };
  /**
   * This is a function to handle send message operation
   * */
  const submitMessageFn = async (msg) => {
    // create a string in the form of user1 : user 2
    const buildDocKey = (friend) => [email, friend].sort().join(":");
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((_usr) => _usr !== email)[0]
    );
    updateConversation(docKey, email, msg);
  };

  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div className={Styles.container}>
      <Grid container direction="row" justify="center">
        <Grid item xs={3}>
          <FriendList
            selectChatFn={selectChat}
            userEmail={email}
            chats={chats}
            userProfile={userProfile}
            selectedChat={selectedChat}
          />
        </Grid>
        <Grid item xs={9}>
          {chats ? (
            <ChatView
              user={email}
              chat={chats[selectedChat]}
              submitMessageFn={submitMessageFn}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
export default Dashboard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

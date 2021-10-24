/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect, useRef } from "react";
import FriendList from "../../Components/FriendList/FriendList";
import ChatView from "../../Components/ChatView/ChatView";
import firebase from "firebase";
import Styles from "./Dashboard.module.scss";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import * as actions from "../../Store/ProfileModule/actions";
import { useHistory } from "react-router-dom";

// import { timeStamp } from "console";

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
const initState = {
  displayName: "",
  gender: "",
  description: "",
  birthday: "",
};
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

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
   * This is current state of user profile
   */
  const userProfile = useSelector(
    (state: RootState) => state.profileReducer.users[email]?.profile
  );

  /**
   * This is a hook to retrieve user's profile & friend list when authorized user visits the page
   * */
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // redirect unauthorized user to the login page
      if (!user) {
        history.push("/login");
      } else {
        let email = user.email;
        // only for facebook users
        if (email == null) {
          email = user.providerData[0].uid + "@" + "facebook.com";
        }
        // retrieve user profile data
        dispatch(actions.getUsersAction(email));
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
  const selectChat = async (index) => {
    chatIndex.current = index;
    setChatState({ ...chatState, selectedChat: index });
    readMsg();
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
  const buildDocKey = (friend) => [email, friend].sort().join(":");

  /**
   * This is a function to handle send message operation
   * */
  const submitMessageFn = async (msg) => {
    // create a string in the form of user1 : user 2
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((_usr) => _usr !== email)[0]
    );
    updateConversation(docKey, email, msg);
  };
  const readMsg = async () => {
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((_usr) => _usr !== email)[0]
    );
    if (receiverHasReadMsg()) {
      await firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("Clicked message where the user was the sender");
    }
  };

  const receiverHasReadMsg = () => {
    return (
      chats[selectedChat].messages[chats[selectedChat].messages.length - 1]
        .sender !== email
    );
  };

  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div className={Styles.Dashboard_container}>
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item xs={3}>
          {firebase.auth().currentUser ? (
            <FriendList
              selectChatFn={selectChat}
              userEmail={email}
              chats={chats}
              userProfile={userProfile ? userProfile : initState}
              selectedChat={selectedChat}
            />
          ) : null}
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

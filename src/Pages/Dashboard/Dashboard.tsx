import React, { useState, useEffect, useRef } from "react";
import FriendList from "../../Components/FriendList/FriendList";
import ChatView from "../../Components/ChatView/ChatView";
import firebase from "firebase";
import Styles from "./Dashboard.module.scss";
import { timeStamp } from "console";
import Grid from "@material-ui/core/Grid";

interface chatState {
  selectedChat: number | null;
  newChatFormVisible: boolean;
  email: String | null;
  displayName: String | null;
  chats: firebase.firestore.DocumentData[] | null;
}
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const chatIndex = useRef(0);

  const [chatState, setChatState] = useState<chatState>({
    selectedChat: chatIndex.current,
    newChatFormVisible: false,
    email: "",
    displayName: "",
    chats: null,
  });
  const [userProfile, setUserProfile] = useState({
    displayName: "",
    // avatar
    // description
    // interests
    // age
    // gender
  });

  const selectChat = (index) => {
    chatIndex.current = index;
    setChatState({ ...chatState, selectedChat: index });
  };
  // create a string in the form of user1 (send message) : user 2
  const buildDocKey = (friend) => [chatState.email, friend].sort().join(":");

  const submitMessageFn = async (msg) => {
    const docKey = buildDocKey(
      chatState.chats[chatState.selectedChat].users.filter(
        (_usr) => _usr !== chatState.email
      )[0]
    );
    console.log({ buildDocKey });
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      // This block of code resets the selected chat index
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
        let email;
        if (user.email == null) {
          email = user.providerData[0].uid + "@" + "facebook.com";
        }
        console.log(email);
        // retrieve user profile data
        await firebase
          .firestore()
          .collection("users")
          .where("email", "==", user.email ? user.email : email)
          .onSnapshot(async (res) => {
            let profile = res.docs.map((doc) => doc.data());
            setUserProfile({
              ...userProfile,
              displayName: profile[0].displayName,
            });
          });

        // retrieve messages
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", user.email ? user.email : email)
          .onSnapshot(async (res) => {
            let chats = res.docs.map((doc) => doc.data());

            setChatState({
              ...chatState,
              chats: chats,
              email: user.email ? user.email : email,
              selectedChat: chatIndex.current,
            });
          });
      }
    });
  }, []);

  return (
    // <div className={Styles.container}>
    //   <ChartList
    //     newChatBtnFn={newChatBtnClick}
    //     selectChatFn={selectChat}
    //     userEmail={chatState.email}
    //     chats={chatState.chats}
    //     selectedChat={chatState.selectedChat}
    //   />
    //   {chatState.chats ? (
    //     <ChatView
    //       user={chatState.email}
    //       chat={chatState.chats[chatState.selectedChat]}
    //       submitMessageFn={submitMessageFn}
    //     />
    //   ) : null}
    //   {/* <Button className={Styles.signOutBtn}> Sign Out</Button> */}
    // </div>

    <div className={Styles.container}>
      <Grid container direction="row" justify="center">
        <Grid item xs={3}>
          <FriendList
            selectChatFn={selectChat}
            userEmail={chatState.email}
            chats={chatState.chats}
            displayName={userProfile.displayName}
            selectedChat={chatState.selectedChat}
          />
        </Grid>
        <Grid item xs={9}>
          {chatState.chats ? (
            <ChatView
              user={chatState.email}
              chat={chatState.chats[chatState.selectedChat]}
              submitMessageFn={submitMessageFn}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
export default Dashboard;

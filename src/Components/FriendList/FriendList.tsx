import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "@material-ui/core/Avatar";
import Styles from "./FriendList.module.css";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
// **
import DefaultAvatar from "../../Assets/DefaultAvatar/download.jpg";
import DefaultAvatar_1 from "../../Assets/DefaultAvatar/download-1.jpg";
import firebase from "firebase";

interface ChatListProps {
  newChatBtnFn: () => void;
  selectChatFn: (chatIndex: any) => void;
  userEmail: String;
  selectedChat: number | null;
  chats: firebase.firestore.DocumentData[];
}
const ChartList: React.FC<ChatListProps> = ({
  newChatBtnFn,
  selectChatFn,
  selectedChat,
  userEmail,
  chats,
}: ChatListProps): JSX.Element => {
  const newChats = () => {
    console.log("new chat");
  };
  const useStyles = makeStyles({
    root: {
      "&$selected": {
        backgroundColor: "rgb(80, 80, 80)",
      },
      "&$selected:hover": {
        backgroundColor: "rgb(80, 80, 80)",
      },
    },
    selected: {},
  });
  const classes = useStyles();

  useEffect(() => {}, []);
  // props for search bar component
  const [userInput, setUserInput] = useState("Search");
  const handleUserTyping = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.chatHeader}>
        <Avatar
          variant={"rounded"}
          src={DefaultAvatar_1}
          className={Styles.avatar}
        />
        <span className={Styles.username}>{userEmail}</span>
      </div>
      <SearchBar userInput={userInput} onChange={handleUserTyping} />

      <List>
        {chats
          ? chats.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem
                    className={Styles.listItem}
                    onClick={() => selectChatFn(index)}
                    alignItems="flex-start"
                    selected={selectedChat === index}
                    classes={{ root: classes.root, selected: classes.selected }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant={"rounded"}
                        // use default avatar if use has not set his own
                        src={DefaultAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        // user email or username
                        chat.users.filter((user) => user !== userEmail)[0]
                      }
                      secondary={
                        // latest message from sender
                        <span className={Styles.message}>
                          {chat.messages[
                            chat.messages.length - 1
                          ].message.substring(0, 30) + " ..."}
                        </span>
                      }
                    ></ListItemText>
                  </ListItem>
                  <Divider />
                </div>
              );
            })
          : null}
      </List>
    </div>
  );
};

export default ChartList;

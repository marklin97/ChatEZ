import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Styles from "./ChatList.module.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
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
  const newChat = () => {
    console.log("new chat");
  };
  useEffect(() => {}, []);
  return (
    <div className={Styles.container}>
      <div className={Styles.chatHeader}></div>
      {/* <Button
        fullWidth
        variant="contained"
        className={Styles.newChatBtn}
        style={{ borderRadius: 0 }}
        onClick={newChat}
      >
        NEW MESSAGE
      </Button> */}
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
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {
                          // would be replaced with actual avatar in the later stage
                          chat.users
                            .filter((user) => user !== userEmail)[0]
                            .split("")[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        // user email
                        chat.users.filter((user) => user !== userEmail)[0]
                      }
                      secondary={
                        // latest message from sender
                        <Typography component="span" color="textPrimary">
                          {chat.messages[
                            chat.messages.length - 1
                          ].message.substring(0, 30) + " ..."}
                        </Typography>
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

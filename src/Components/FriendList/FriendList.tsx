import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "@material-ui/core/Avatar";
import Styles from "./FriendList.module.scss";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import UserMenu from "../UserMenu/UserMenu";

// **
import DefaultAvatar from "../../Assets/DefaultAvatar/download.jpg";
import DefaultAvatar_1 from "../../Assets/DefaultAvatar/download-1.jpg";
import firebase from "firebase";

interface FriendProps {
  selectChatFn: (chatIndex: number) => void;
  userEmail: String;
  displayName: String;
  selectedChat: number;
  chats: firebase.firestore.DocumentData[];
}
const ChartList: React.FC<FriendProps> = ({
  selectChatFn,
  selectedChat,
  displayName,
  userEmail,
  chats,
}) => {
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
  const [userInput, setUserInput] = useState("Search");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [friendList, setFriendList] = useState(chats);

  useEffect(() => {
    setFriendList(chats);
  }, [chats]);
  const handleUserTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchResult = [];
    console.log(chats);
    if (chats !== null && e.target.value !== "") {
      for (let i = 0; i < chats.length; i++) {
        if (
          /* users involved in a conversation are the in format of sender : receiver , no matter who's the sender
             or receiver, they all going to be displayed in the chat list of relevant user.
             Thus,we need to perform search in both side to search for the target chat.
          */
          chats[i].users[0].includes(e.target.value) ||
          chats[i].users[1].includes(e.target.value)
        ) {
          searchResult.push(chats[i]);
        }
      }
    } else {
      searchResult = chats;
    }
    setFriendList(searchResult);
  };
  // set avatar as the anchor element, since menus open over the anchor element by default.
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.chat_header}>
        <IconButton onClick={handleClick}>
          <Avatar
            variant={"rounded"}
            src={DefaultAvatar_1}
            className={Styles.user_avatar}
          />
        </IconButton>
        <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />

        {displayName === " " || null ? (
          <span className={Styles.user_name}>{displayName}</span>
        ) : (
          <span className={Styles.user_name}>{displayName}</span>
        )}
      </div>
      <SearchBar userInput={userInput} onChange={handleUserTyping} />

      <List>
        {friendList
          ? friendList.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem
                    className={Styles.list_item}
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

/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Styles from "./FriendList.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import UserMenu from "../UserMenu/UserMenu";
import UserAvatar from "../UserAvatar/UserAvatar";
import DefaultAvatar from "../../Assets/DefaultAvatar/download.jpg";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import * as actions from "../../Store/UserModule/actions";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
} from "@material-ui/core";
import axios, { AxiosRequestConfig } from "axios";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/

/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface FriendListProps {
  selectChatFn: (chatIndex: number) => void;
  userEmail: string;
  selectedChat: number;
  chats: firebase.firestore.DocumentData[];
  userProfile: any;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const FriendList: React.FC<FriendListProps> = ({
  selectChatFn,
  selectedChat,
  userEmail,
  userProfile,
  chats,
}) => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  const dispatch = useDispatch();
  /**
   * This is user's current avatar
   * */

  const avatar = useSelector(
    (state: RootState) => state.userProfileReducer.avatar
  );

  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the anchor element for Menu component
   *  Material UI Menu component opens next to the anchor element by default
   * */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  /**
   *  This hook holds the user avatar file
   * */
  /**
   *  This hook holds the current list of friends
   *  This hook is invoked every time user adds a new friend or typing in the search bar
   * */
  const [friendList, setFriendList] = useState(chats);
  /**
   *  This hook is invoked every time the user visits the page, or user's friend list changes
   *  This hook retrieves user avatar & profile
   * */
  useEffect(() => {
    dispatch(actions.getAvatarAction(userEmail));
    setFriendList(chats);
  }, [chats]);
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
  /*
   */
  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/

  /**
   * This is a function to customized the material ui component
   * */
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

  /**
   * This function is to handle search input
   * This function is invoked every time user types in search form
   */
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
  /**
   * This function handles user click on avatar
   */
  // set avatar as the anchor element,menu opens next to the anchor element by default.
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div className={Styles.container}>
      <div className={Styles.chat_header}>
        <IconButton onClick={handleClick}>
          <UserAvatar imgSrc={avatar} variant={"rounded"} />
        </IconButton>
        <UserMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          userEmail={userEmail}
          imgSrc={avatar}
          userProfile={userProfile}
        />

        {userProfile.displayName === " " || null ? (
          <span className={Styles.user_name}>{userEmail}</span>
        ) : (
          <span className={Styles.user_name}>{userProfile.displayName}</span>
        )}
      </div>
      <SearchBar onChange={handleUserTyping} />

      <List>
        {friendList
          ? friendList.map((chat, index) => {
              let friendEmail = chat.users.filter(
                (user) => user !== userEmail
              )[0];

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
                      <UserAvatar userEmail={friendEmail} variant={"rounded"} />
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
export default FriendList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import Styles from "./SearchForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Store/RequestModule/actions";
import { RootState } from "../../Store/rootReducer";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import ConfirmBox from "../SearchForm/ConfirmBox/ConfirmBox";
import UserItem from "./UserItem/UserItem";
import NotFoundImg from "../../Assets/Images/NotFound.png";
import firebase from "firebase";

import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const SearchForm = (): JSX.Element => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const result = useSelector((state: RootState) => state.requestReducer.users);
  /**
   *  This hook holds the state of display of the search form
   * */
  const [open, setOpen] = React.useState(false);
  const [openPrompt, setOpenPrompt] = React.useState(false);
  const dispatch = useDispatch();
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
  /*
  /** */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   *  This is a function to handle open operation of search form
   * */
  const handleOpen = () => {
    setOpen(true);
  };
  /**
   *  This is a function to handle close operation of search form
   * */
  const handleClose = () => {
    dispatch(actions.resetAction());
    setOpen(false);
  };

  const handleOpenPrompt = (email: string) => {
    setSelectedUser(email);
    setOpenPrompt(true);
  };
  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };
  const handleSearch = () => {
    if (input.length > 0) {
      dispatch(actions.resetAction());
      dispatch(actions.getUserAction(input));
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      dispatch(actions.resetAction());
      dispatch(actions.getUserAction(input));
    }
  };
  return (
    <div>
      <Button>
        <AddIcon className={Styles.searchForm_addIcon} onClick={handleOpen} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className={Styles.searchForm_header}>Add New Friend</span>
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Search by Email Address / Email Prefix"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={Styles.searchForm_inputField}
          />
          <IconButton
            onClick={handleSearch}
            className={Styles.searchForm_searchIcon}
          >
            <SearchIcon />
          </IconButton>
        </DialogContent>
        <div className={Styles.searchForm_container}>
          {result.length > 0 ? (
            result.map((user, index) => {
              if (user.email !== firebase.auth().currentUser.email) {
                return (
                  <div key={index}>
                    <UserItem
                      email={user.email}
                      displayName={user.displayName}
                      handleOpen={() => handleOpenPrompt(user.email)}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <img
              className={Styles.searchForm_img}
              src={NotFoundImg}
              alt="Not Found"
            />
          )}
        </div>
        <ConfirmBox
          email={selectedUser}
          open={openPrompt}
          handleClose={handleClosePrompt}
        />
      </Dialog>
    </div>
  );
};

export default SearchForm;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

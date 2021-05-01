/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Dispatch, useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import firebase from "firebase";
import Styles from "./UserMenu.module.scss";
import UserProfile from "../UserProfile/UserProfile";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface UserMenuProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<HTMLElement>;
  userEmail?: string;
  imgSrc?: string;
  userProfile: any;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  setAnchorEl,
  userEmail,
  imgSrc,
  userProfile,
}) => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the state of display of the user menu
   * */
  const [open, setOpen] = useState(false);

  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
  /*
  /** */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is a function to handle sign out option of the menu
   * */
  const handleSignOut = () => {
    setAnchorEl(null);
    firebase.auth().signOut();
  };
  /**
   * This is a function to handle profile option of the menu
   * */
  const handleProfile = () => {
    setAnchorEl(null);
    setOpen(true);
  };
  /**
   * This is a function to exit operation of the menu
   * */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  /**
   * This is a function to exit operation of the menu
   * */
  const handleFormClose = () => {
    setOpen(false);
  };
  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div>
      <Menu
        id="simple-menu"
        elevation={0}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon className={Styles.AccountIcon} />

          <span className={Styles.menu_item}>Profile</span>
        </MenuItem>

        <MenuItem onClick={handleSignOut}>
          <PowerSettingsNewIcon className={Styles.SignOutIcon} />

          <span className={Styles.menuItem}>Offline</span>
        </MenuItem>
      </Menu>
      <UserProfile
        open={open}
        handleClose={handleFormClose}
        userEmail={userEmail}
        imgSrc={imgSrc}
        userProfile={userProfile}
      />
    </div>
  );
};

export default UserMenu;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

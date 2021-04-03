import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import firebase from "firebase";
import Styles from "./UserMenu.module.scss";
import AvatarUploader from "../UserProfile/AvatarUploader/AvatarUploader";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, setAnchorEl }) => {
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    setAnchorEl(null);
    firebase.auth().signOut();
  };
  const handleProfile = () => {
    setAnchorEl(null);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        elevation={0}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
      <AvatarUploader open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserMenu;

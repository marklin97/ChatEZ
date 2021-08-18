import React from "react";
import Styles from "./UserItem.module.scss";
import { Avatar, Grid, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { RootState } from "../../../Store/rootReducer";
import { useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
/** This section will include all the necessary interface for this tsx file */
interface UserItemProps {
  email: string;
  displayName: string;
  handleOpen: () => void;
}
const SearchList: React.FC<UserItemProps> = ({
  email,
  displayName,
  handleOpen,
}): JSX.Element => {
  const friends = useSelector((state: RootState) =>
    Object.keys(state.profileReducer.users)
  );
  return (
    <div>
      <Grid container spacing={4} direction="row" justify="flex-start">
        <Grid item xs={1} className={Styles.userItem_avatar}>
          <Avatar>
            <PersonOutlineOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item xs={7}>
          <Grid container direction="column">
            <Grid className={Styles.userItem_displayName}>{displayName}</Grid>
            <Grid className={Styles.userItem_email}>{email}</Grid>
          </Grid>
        </Grid>
        <Grid>
          {
            // If user already in the friend list
            friends.includes(email) ? (
              <span className={Styles.userItem_addIcon__hidden}>Added</span>
            ) : (
              <IconButton
                className={Styles.userItem_addIcon}
                onClick={handleOpen}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            )
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchList;

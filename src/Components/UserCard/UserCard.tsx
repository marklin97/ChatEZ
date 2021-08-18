/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CancelIcon from "@material-ui/icons/Cancel";
import Styles from "./UserCard.module.scss";
import backgroundImage from "../../Assets/Images/UserProfile_Background.jpg";
import DetailForm from "./DetailForm/DetailForm";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface UserProfileProps {
  open: boolean;
  handleClose: () => void;
  userEmail: string;
  imgSrc?: string;
  variant?: "circle" | "rounded" | "square";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const UserProfile: React.FC<UserProfileProps> = ({
  open,
  handleClose,
  userEmail,
  imgSrc,
}) => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the url of uploaded avatar
   *  This is for the image to be displayed on the html page
   * */
  const [preview, setPreview] = useState("");
  /**
   *  This hook holds the raw file of uploaded avatar
   *  This is for the image file to be stored in the database
   * */
  const [file, setFile] = useState(null);

  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is an function customized the style for material ui component
   * */

  const backgroundStyles = makeStyles({
    dialog: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "100%",
    },
  });
  const classes = backgroundStyles();

  /**
   * This is a function to handle the upload operation of avatar
   * */
  const handleUpload = async (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      setPreview(reader.result as string);
      setFile(file);
    };
  };
  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.dialog }}
      >
        <IconButton className={Styles.userCard_closeIcon} onClick={handleClose}>
          <CancelIcon fontSize={"small"} />
        </IconButton>

        <DialogContent style={{ textAlign: "center" }}>
          <IconButton className={Styles.userCard_avatar}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="raised-button-file">
              <UserAvatar
                imgSrc={preview ? preview : imgSrc}
                userEmail={userEmail}
                size={"large"}
                variant={"circle"}
              />
              <PhotoCameraIcon
                className={Styles.userCard_cameraIcon}
                fontSize="large"
                color="secondary"
              />
            </label>
          </IconButton>
        </DialogContent>

        <DetailForm imageFile={file} userEmail={userEmail} />
      </Dialog>
    </div>
  );
};

export default UserProfile;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

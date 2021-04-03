import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CancelIcon from "@material-ui/icons/Cancel";
import Styles from "./AvatarUploader.module.scss";
import backgroundImage from "../../../Assets/Images/UserProfile_Background.jpg";
import ProfileForm from "../ProfileForm/ProfileForm";
import { Dialog, DialogContent, Avatar, makeStyles } from "@material-ui/core";
// import DefaultAvatar from "../../../Assets/DefaultAvatar/download-1.jpg";

interface AvatarUploaderProps {
  open: boolean;
  setOpen: any;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ open, setOpen }) => {
  const [preview, setPreview] = useState(null);
  const backgroundStyles = makeStyles({
    dialog: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "100%",
    },
  });
  const classes = backgroundStyles();

  const handleClose = () => setOpen(false);
  const handleUpload = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      setPreview(reader.result);
    };
  };
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
        <IconButton
          style={{ width: "1rem", height: "1rem" }}
          onClick={handleClose}
        >
          <CancelIcon fontSize={"small"} className={Styles.closeIcon} />
        </IconButton>

        <DialogContent style={{ textAlign: "center" }}>
          <IconButton className={Styles.avatar}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="raised-button-file">
              <Avatar
                src={preview}
                style={{
                  width: "110px",
                  height: "110px",
                }}
              />
              <PhotoCameraIcon
                className={Styles.cameraIcon}
                fontSize="large"
                color="secondary"
              />
            </label>
          </IconButton>
        </DialogContent>
        <ProfileForm />
      </Dialog>
    </div>
  );
};

export default AvatarUploader;

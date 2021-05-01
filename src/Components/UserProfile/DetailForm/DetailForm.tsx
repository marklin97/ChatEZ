/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Styles from "./DetailForm.module.scss";
import EditIcon from "@material-ui/icons/Edit";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import firebase from "firebase";
import {
  DialogContent,
  Select,
  Snackbar,
  FormHelperText,
  FormControl,
  Input,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Button,
  DialogActions,
} from "@material-ui/core";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/

interface DetailFormProps {
  imageFile: File;
  userProfile: any;
}
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DetailForm: React.FC<DetailFormProps> = ({
  imageFile,

  userProfile,
}) => {
  const userEmail = firebase.auth().currentUser.email;
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the state of editable of the form
   * */
  const [disableEdit, setDisableEdit] = useState(true);
  /**
   *  This hook holds the state of userProfile
   *  This hook will be handle by the saga in the future
   * */
  const [profile, setProfile] = useState({
    description: userProfile.description,
    birthday: "0001-01-01",
    gender: userProfile.gender,
  });
  /**
   *  This hook holds the state of display of the snackbar
   * */
  const [open, setOpen] = useState(false);
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is an function to handle user typing in description field in profile page
   * */
  const handleTextChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({ ...profile, description: event.target.value });
  };
  /**
   * This is an function to handle change of gender field
   * */
  const handleGenderChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({ ...profile, gender: event.target.value as string });
  };
  /**
   * This is an function to handle change of gender field
   * */
  const handleDateChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({
      ...profile,
      birthday: event.target.value,
    });
  };
  /**
   * This is an function to handle state of editable of form
   * */
  const handleIconClick = () => {
    setDisableEdit(!disableEdit);
  };
  const handleAlertClose = () => {
    setOpen(false);
  };
  /**
   * This is an function to handle save button click
   * */
  const handleSave = async () => {
    // Create a root reference of avatar storage
    const storageRef = firebase.storage().ref();
    // Create a reference to user avatar file
    const avatarRef = storageRef.child(`Avatars/${userEmail}`);
    // Update the change with database
    if (imageFile) {
      await avatarRef.put(imageFile);
    }
    await firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .set(profile, { merge: true });

    setOpen(true);
    //refresh the page after 2 seconds
    window.setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  /**
   * This is an function to calculate the age of user by birthday
   * */
  const calculateAge = () => {
    let today = new Date();
    let date = new Date(birthday);
    let currentAge = today.getFullYear() - date.getFullYear();
    let month = today.getMonth() - date.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
      currentAge--;
    }
    return currentAge;
  };
  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  const { description, birthday, gender } = profile;

  return (
    <div>
      <div>
        <DialogContent
          style={{
            marginTop: "5%",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <FormControl disabled={disableEdit} style={{ marginLeft: "10%" }}>
            <Input
              multiline
              rowsMax="3"
              id="my-input"
              value={description}
              onChange={handleTextChange}
            />

            <FormHelperText>Describe yourself in one sentence</FormHelperText>
          </FormControl>
          <IconButton onClick={handleIconClick}>
            <EditIcon />
          </IconButton>
        </DialogContent>
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <DialogContent
              className={Styles.dialog_content}
              style={{ paddingLeft: "50%" }}
            >
              {gender === "male" ? (
                <i className={`fas fa-mars` + " " + Styles.marsIcon}></i>
              ) : (
                <i className={`fas fa-venus` + " " + Styles.venusIcon}></i>
              )}

              <Select
                value={gender}
                onChange={handleGenderChange}
                disabled={disableEdit}
              >
                <MenuItem value={"male"}>
                  <span className={Styles.optionText}>Male</span>
                </MenuItem>
                <MenuItem value={"female"}>
                  <span className={Styles.optionText}>Female</span>
                </MenuItem>
              </Select>
            </DialogContent>
          </Grid>
          <Grid item xs={7}>
            <DialogContent className={Styles.dialog_content}>
              <div style={{ height: "32%" }}>
                <Typography
                  variant="h4"
                  style={{ color: "#3fbfbf" }}
                >{`${calculateAge()}`}</Typography>
              </div>
              <TextField
                id="date"
                type="date"
                defaultValue={userProfile.birthday}
                className={Styles.optionText}
                onChange={handleDateChange}
                disabled={disableEdit}
              />
              <FormHelperText style={{ marginLeft: "12%" }}>
                Date Of Birth
              </FormHelperText>
            </DialogContent>
          </Grid>
        </Grid>

        <DialogActions className={Styles.dialog_action}>
          <Button className={Styles.save_button} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={4000}
        open={open}
        onClose={handleAlertClose}
      >
        <Alert severity="success">
          Updated Successfully, Page will be automatically reloaded
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DetailForm;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

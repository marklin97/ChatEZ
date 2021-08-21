/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store/rootReducer";
import IconButton from "@material-ui/core/IconButton";
import Styles from "./DetailForm.module.scss";
import EditIcon from "@material-ui/icons/Edit";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import firebase from "firebase";
import * as actions from "../../../Store/ProfileModule/actions";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
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
  userEmail: string;
}
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const DetailForm: React.FC<DetailFormProps> = ({ imageFile, userEmail }) => {
  const dispatch = useDispatch();
  // This needs to be fixed
  const profile = useSelector(
    (state: RootState) => state.profileReducer.users[userEmail]?.profile
  );
  const updateSuccess = useSelector(
    (state: RootState) => state.profileReducer.updateSuccess
  );

  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the state of editable of the form
   * */
  const [disableEdit, setDisableEdit] = useState(true);
  /**
   *  This hook holds the init state of userProfile
   * */
  const [localProfile, setProfile] = useState({
    description: profile.description,
    birthday: profile.birthday,
    gender: profile.gender,
  });
  const { description, birthday, gender } = localProfile;

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
    setProfile({ ...localProfile, description: event.target.value });
  };
  /**
   * This is an function to handle change of gender field
   * */
  const handleGenderChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log(event.target.value as string);
    setProfile({ ...localProfile, gender: event.target.value as string });
  };
  // /**
  //  * This is an function to handle change of gender field
  //  * */
  const handleDateChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({
      ...localProfile,
      birthday: event.target.value,
    });
  };
  /**
   * This is an function to handle state of editable of form
   * */
  const handleIconClick = () => {
    if (firebase.auth().currentUser.email === userEmail) {
      setDisableEdit(!disableEdit);
    }
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(actions.resetStateAction());
    setOpen(false);
  };

  /**
   * This is an function to handle save button click
   * */
  const handleSave = async () => {
    dispatch(
      actions.updateProfileAction(
        imageFile ? imageFile : null,
        userEmail,
        gender,
        description ? description : "",
        birthday
      )
    );
    setOpen(true);
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
          <FormControl disabled={disableEdit}>
            <Input
              multiline
              rowsMax="3"
              id="my-input"
              value={description}
              onChange={handleTextChange}
            />

            <FormHelperText>Describe yourself in one sentence</FormHelperText>
          </FormControl>
          {firebase.auth().currentUser.email === userEmail ? (
            <IconButton
              onClick={handleIconClick}
              style={{ position: "relative" }}
            >
              <EditIcon />
            </IconButton>
          ) : null}
        </DialogContent>
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <DialogContent
              className={Styles.form_dialog}
              style={{ paddingLeft: "50%" }}
            >
              {gender === "male" ? (
                <i className={`fas fa-mars ` + Styles.form_marsIcon}></i>
              ) : (
                <i className={`fas fa-venus ` + Styles.form_venusIcon}></i>
              )}

              <Select
                value={gender}
                onChange={handleGenderChange}
                disabled={disableEdit}
              >
                <MenuItem value={"male"}>
                  <span className={Styles.form_text}>Male</span>
                </MenuItem>
                <MenuItem value={"female"}>
                  <span className={Styles.form_text}>Female</span>
                </MenuItem>
              </Select>
            </DialogContent>
          </Grid>
          <Grid item xs={7}>
            <DialogContent className={Styles.form_dialog}>
              <div style={{ height: "31%" }}>
                <Typography
                  variant="h4"
                  style={{ color: "#3fbfbf" }}
                >{`${calculateAge()}`}</Typography>
              </div>
              <TextField
                type="date"
                defaultValue={birthday}
                className={Styles.form_text}
                disabled={disableEdit}
                onChange={handleDateChange}
                // disables key input on date selection
                onKeyDown={(event) => {
                  event.preventDefault();
                }}
                InputProps={{
                  inputProps: {
                    min: "1970-01-01",
                    max: "2003-01-01",
                  },
                }}
              />
              <FormHelperText style={{ marginLeft: "16%" }}>
                Date Of Birth
              </FormHelperText>
            </DialogContent>
          </Grid>
        </Grid>

        <DialogActions className={Styles.form_dialogAction}>
          {firebase.auth().currentUser.email === userEmail ? (
            <Button className={Styles.save_button} onClick={handleSave}>
              Save
            </Button>
          ) : null}
        </DialogActions>
      </div>
      {updateSuccess !== null ? (
        <Snackbar
          autoHideDuration={1500}
          open={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          onClose={handleAlertClose}
        >
          {updateSuccess ? (
            <Alert severity="success">Success! Changes have been saved</Alert>
          ) : (
            <Alert severity="warning">Failed! Unable to save the changes</Alert>
          )}
        </Snackbar>
      ) : null}
    </div>
  );
};

export default DetailForm;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

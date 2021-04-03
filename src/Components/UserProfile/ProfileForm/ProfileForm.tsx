import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Styles from "./ProfileForm.module.scss";
import EditIcon from "@material-ui/icons/Edit";
import {
  DialogContent,
  Select,
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
interface ProfileProps {}

const ProfileForm: React.FC<ProfileProps> = () => {
  const [uneditable, setUneditable] = useState(true);
  const [profile, setProfile] = useState({
    description: "",
    age: 0,
    birthday: "1999-05-24",
    gender: "male",
  });
  const handleTextChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({ ...profile, description: event.target.value });
  };
  const handleGenderChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({ ...profile, gender: event.target.value as string });
  };
  const handleDateChange = (event: React.ChangeEvent<{ value: string }>) => {
    setProfile({
      ...profile,
      birthday: event.target.value,
    });
  };
  const handleIconClick = () => {
    setUneditable(false);
  };
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

  const { description, age, birthday, gender } = profile;

  return (
    <div>
      <DialogContent
        style={{
          marginTop: "5%",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <FormControl disabled={uneditable} style={{ marginLeft: "10%" }}>
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
            {gender == "male" ? (
              <i className={`fas fa-mars` + " " + Styles.marsIcon}></i>
            ) : (
              <i className={`fas fa-venus` + " " + Styles.venusIcon}></i>
            )}

            <Select
              value={gender}
              onChange={handleGenderChange}
              disabled={uneditable}
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
              defaultValue="1999-05-24"
              className={Styles.optionText}
              onChange={handleDateChange}
              disabled={uneditable}
            />
            <FormHelperText style={{ marginLeft: "12%" }}>
              Date Of Birth
            </FormHelperText>
          </DialogContent>
        </Grid>
      </Grid>

      <DialogActions className={Styles.dialog_action}>
        <Button className={Styles.save_button}>Save </Button>
      </DialogActions>
    </div>
  );
};

export default ProfileForm;

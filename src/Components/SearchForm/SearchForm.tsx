/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Styles from "./SearchForm.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const SearchForm = (): JSX.Element => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the state of display of the search form
   * */
  const [open, setOpen] = React.useState(false);
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
    setOpen(false);
  };
  return (
    <div>
      <Button>
        <AddIcon className={Styles.addIcon} onClick={handleOpen} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span style={{ fontSize: "1rem" }}>Add New Friend</span>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Email Address / Username"
            type="email"
            fullWidth
          />
        </DialogContent>
        <div></div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchForm;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

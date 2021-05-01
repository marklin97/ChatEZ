/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Button } from "@material-ui/core";
import React from "react";
import Styles from "./Footer.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const Footer = (): JSX.Element => {
  return (
    <div className={Styles.footer_container}>
      <Button>
        <span className={Styles.footer_button}>English</span>
      </Button>
      <span className={Styles.button_separator}>{`|`}</span>
      <Button color="primary">
        <span className={Styles.footer_button}>简体中文</span>
      </Button>
      <span className={Styles.button_separator}>{`|`}</span>
      <Button color="primary">
        <span className={Styles.footer_button}>繁體中文</span>
      </Button>
      <span className={Styles.copyright}>
        © ChatEZ - Demo Project by Mark Lin
      </span>
    </div>
  );
};
export default Footer;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

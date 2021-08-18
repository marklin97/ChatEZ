/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Button } from "@material-ui/core";
import React from "react";
import Styles from "./Footer.module.scss";
import { useTranslation } from "react-i18next";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const Footer = (): JSX.Element => {
  const { i18n } = useTranslation();

  return (
    <div className={Styles.footer}>
      <Button onClick={() => i18n.changeLanguage("en")}>
        <span className={Styles.footer_button}>English</span>
      </Button>
      <span className={Styles.footer_separator}>{`|`}</span>
      <Button onClick={() => i18n.changeLanguage("ch")}>
        <span className={Styles.footer_button}>简体中文</span>
      </Button>
      <span className={Styles.footer_separator}>{`|`}</span>
      <Button onClick={() => i18n.changeLanguage("ch_td")}>
        <span className={Styles.footer_button}>繁體中文</span>
      </Button>
      <span className={Styles.footer_copyright}>
        © ChatEZ - Demo Project by Mark Lin
      </span>
    </div>
  );
};
export default Footer;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

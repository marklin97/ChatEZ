import { Button } from "@material-ui/core";
import React from "react";
import Styles from "./Footer.module.css";
interface Props {}

const Footer = (props: Props) => {
  return (
    <div className={Styles.footerContainer}>
      <Button>
        <span className={Styles.footerButton}>English</span>
      </Button>
      <span className={Styles.buttonSeparator}>{`|`}</span>
      <Button color="primary">
        <span className={Styles.footerButton}>简体中文</span>
      </Button>
      <span className={Styles.buttonSeparator}>{`|`}</span>
      <Button color="primary">
        <span className={Styles.footerButton}>繁體中文</span>
      </Button>
      <span className={Styles.copyright}>
        © ChatEZ - Demo Project by Mark Lin
      </span>
    </div>
  );
};

export default Footer;

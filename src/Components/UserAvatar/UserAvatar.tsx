/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";

import { Avatar } from "@material-ui/core/";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import DefaultAvatar from "../../Assets/Avatar/default.jpg";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */

interface UserAvatarProps {
  userEmail?: string;
  imgSrc?: string;
  size?: string;
  variant?: "circle" | "rounded" | "square";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const UserAvatar: React.FC<UserAvatarProps> = ({
  userEmail,
  imgSrc,
  size,
  variant,
}) => {
  /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
  /**
   * This is user's current login status
   * */
  const userAvatar = useSelector(
    // (state: RootState) => state.userReducer.avatar
    (state: RootState) => state.profileReducer.users[userEmail]?.profile.avatar
  );
  /************* This section will include this component HOOK function *************/

  /**
   *  This hook sets the image style according to the variant
   * */
  const [imgStyle, setImgStyle] = useState(null);
  /**
   *  This hook retrieves user avatar from storage and sets the avatar style
   *  This hook invokes every-time user email gets changed
   * */
  useEffect(() => {
    getStyle(size);
  }, [userEmail, size]);
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is an function customized the style for material ui component
   * */
  const getStyle = (size) => {
    if (size === "large") {
      setImgStyle({ width: "110px", height: "110px" });
    }
  };

  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  if (imgSrc) {
    return <Avatar variant={variant} src={imgSrc} style={imgStyle}></Avatar>;
  } else if (userAvatar) {
    //return <Avatar variant={variant} src={avatar} style={imgStyle}></Avatar>;
    return (
      <Avatar variant={variant} src={userAvatar} style={imgStyle}></Avatar>
    );
  } else {
    return (
      <Avatar variant={variant} src={DefaultAvatar} style={imgStyle}></Avatar>
    );
  }
};

export default UserAvatar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

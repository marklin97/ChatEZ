/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import firebase from "firebase";
import { Avatar } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import DefaultAvatar from "../../Assets/DefaultAvatar/download-1.jpg";
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
  const dispatch = useDispatch();
  /**
   * This is user's current login status
   * */
  const userAvatar = useSelector(
    (state: RootState) => state.userProfileReducer.avatar
  );
  /************* This section will include this component HOOK function *************/
  /**
   *  This hook holds the downloaded avatar from storage
   * */
  const [avatar, setAvatar] = useState(null);
  /**
   *  This hook sets the image style according to the variant
   * */
  const [imgStyle, setImgStyle] = useState(null);
  /**
   *  This hook retrieves user avatar from storage and sets the avatar style
   *  This hook invokes every-time user email gets changed
   * */
  useEffect(() => {
    getUserAvatar(userEmail);
    getStyle(size);
  }, [userEmail]);
  /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

  /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
  /************* This section will include this component general function *************/
  /**
   * This is an function customized the style for material ui component
   * */
  const getStyle = (size) => {
    if (size == "large") {
      setImgStyle({ width: "110px", height: "110px" });
    }
  };
  /**
   * This function is to get user's avatar from firebase storage
   */
  const getUserAvatar = async (email: String) => {
    if (!imgSrc) {
      // Create a root reference
      const storageRef = firebase.storage().ref();
      // Create a reference to user avatar file
      const ref = storageRef.child(`Avatars/${email}`);
      await ref
        .getDownloadURL()
        .then((url) => {
          const config: AxiosRequestConfig = {
            responseType: "blob",
          };
          axios
            .get(url, config)
            .then((response) => {
              setAvatar(URL.createObjectURL(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

  if (imgSrc) {
    return <Avatar variant={variant} src={imgSrc} style={imgStyle}></Avatar>;
  } else if (avatar) {
    return <Avatar variant={variant} src={avatar} style={imgStyle}></Avatar>;
  } else {
    return (
      <Avatar variant={variant} src={DefaultAvatar} style={imgStyle}></Avatar>
    );
  }
};

export default UserAvatar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

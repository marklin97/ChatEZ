import firebase from "firebase";
import axios, { AxiosRequestConfig } from "axios";

const getUserProfile = async (email: string) => {
  await firebase
    .firestore()
    .collection("users")
    .where("email", "==", email)
    .onSnapshot(async (res) => {
      let profile = res.docs.map((doc) => doc.data());
      console.log(profile);
      return profile[0].displayName;
    });
};
const getChatList = async (email: string) => {
  // retrieve messages
  await firebase
    .firestore()
    .collection("chats")
    .where("users", "array-contains", email)
    .onSnapshot(async (res) => {
      let chats = res.docs.map((doc) => doc.data());
      return chats;
    });
};

const getUserAvatar = async (email: string) => {
  // Create a reference with an initial file path and name
  const storage = firebase.storage();
  // const ref = storage.ref(`Avatars/${email}`);
  const ref = storage.ref("sample10086.jpg");
  let file = null;
  ref
    .getDownloadURL()
    .then((url) => {
      const config: AxiosRequestConfig = {
        responseType: "blob",
      };
      axios
        .get(url, config)
        .then((response) => {
          file = new File([response.data], "");
          console.log(file);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  return file;
};

export { getUserProfile, getChatList, getUserAvatar };

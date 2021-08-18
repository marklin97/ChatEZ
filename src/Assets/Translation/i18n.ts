import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          signUpForm: {
            emailLabel: "Enter Your email",
            nameLabel: "Enter A Display Name",
            passwordLabel: "Enter A Password",
            confirmLabel: "Confirm Your Password",
            signUpLabel: "Sign Up",
            suggestion: "Already Have An Account?",
            loginLink: "LOGIN",
          },
          loginForm: {
            emailLabel: "Email Address",
            passwordLabel: "Password",
            loginLabel: "LOGIN",
            suggestion: "Don't Have An Account?",
            signUpLink: "SIGN UP",
          },
        },
      },
      ch: {
        translation: {
          signUpForm: {
            emailLabel: "请输入您的邮箱",
            nameLabel: "请输入用户名",
            passwordLabel: "请输入密码",
            confirmLabel: "请重复输入密码",
            signUpLabel: "注 册 账 号",
            suggestion: "已经拥有了一个账号 ?",
            loginLink: "登 录",
          },
          loginForm: {
            emailLabel: "邮箱",
            passwordLabel: "密码",
            loginLabel: "登 录",
            suggestion: "还未拥有一个账号 ?",
            signUpLink: "注 册",
          },
        },
      },
      ch_td: {
        translation: {
          signUpForm: {
            emailLabel: "請輸入您的郵箱",
            nameLabel: "請輸入用戶名",
            passwordLabel: "請輸入密碼",
            confirmLabel: "請重複輸入密碼",
            signUpLabel: "注 冊 賬 號",
            suggestion: "已經擁有了一個賬號 ?",
            loginLink: "登 錄",
          },
          loginForm: {
            emailLabel: "郵箱",
            passwordLabel: "密碼",
            loginLabel: "登 錄",
            suggestion: "還未擁有一個賬號 ?",
            signUpLink: "注 冊",
          },
        },
      },
    },
  });

export default i18n;

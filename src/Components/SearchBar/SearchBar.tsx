import React from "react";
import Styles from "./SearchBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import FormDialog from "../FormDialog/FormDialog";

interface SearchBarProps {
  userInput: String;
  onChange(e: any): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ userInput, onChange }) => {
  return (
    <div className={Styles.container}>
      <SearchIcon className={Styles.searchIcon} />

      <input
        className={Styles.inputField}
        // value={"        " + userInput}
        onChange={onChange}
        placeholder={"Search"}
      />

      <FormDialog />
    </div>
  );
};

export default SearchBar;

import React from "react";
import Styles from "./SearchBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import SearchForm from "../SearchForm/SearchForm";

interface SearchBarProps {
  userInput: String;
  onChange(e: any): void;
}

const SearchBar: React.FC<SearchBarProps> = ({ userInput, onChange }) => {
  return (
    <div className={Styles.container}>
      <SearchIcon className={Styles.searchIcon} />

      <input
        className={Styles.input_field}
        // value={"        " + userInput}
        onChange={onChange}
        placeholder={"Search"}
      />

      <SearchForm />
    </div>
  );
};

export default SearchBar;

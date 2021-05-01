/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import Styles from "./SearchBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import SearchForm from "../SearchForm/SearchForm";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface SearchBarProps {
  onChange(e: any): void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  return (
    <div className={Styles.container}>
      <SearchIcon className={Styles.searchIcon} />

      <input
        className={Styles.input_field}
        onChange={onChange}
        placeholder={"Search"}
      />

      <SearchForm />
    </div>
  );
};
export default SearchBar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

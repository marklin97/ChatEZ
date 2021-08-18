/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import Styles from "./FilterBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import SearchForm from "../SearchForm/SearchForm";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the necessary interface for this tsx file */
interface FilterBarProps {
  onChange(e: any): void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/*********
/*********
/*********/
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const FilterBar: React.FC<FilterBarProps> = ({ onChange }): JSX.Element => {
  return (
    <div className={Styles.filterBar}>
      <SearchIcon className={Styles.filterBar_btn} />
      <input
        className={Styles.filterBar_input}
        onChange={onChange}
        placeholder={"Search"}
      />

      <SearchForm />
    </div>
  );
};
export default FilterBar;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

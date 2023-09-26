import React from "react";
import styles from "../css/SearchBar.module.css"

function SearchBar(props) {
  return (
    <div className={styles.SearchBar}>
      <form onSubmit={props.onSubmit} className={styles.SearchForm}>
        <div className={styles.Header}>
          <label htmlFor="search">Search a song on spotify</label>
        </div>
        <div className={styles.Inputs}>
          <input type="text" id="search" onChange={props.onChange}></input>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
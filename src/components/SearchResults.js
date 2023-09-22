import React, { useState } from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults(props) {

    let content = "";
    if (props.results.length > 0) {
        content =  <Tracklist results={props.results} onClick={props.onClick} />;
    } else {
        content = "No results to display for now.";
    }

    return (
        <div className={styles.SearchResults}>
            <h2>Search results</h2>
            {content}
        </div>
    );    
}

export default SearchResults;
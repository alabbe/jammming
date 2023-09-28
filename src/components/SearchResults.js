import React, { useState } from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults(props) {

    let content = "";
    if (props.results && props.results.length > 0) {
        content = <Tracklist results={props.results} onClick={props.onAdd} origin={props.origin} />;
    } else {
        content = "No results to display for now.";
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.header}>
                <h2>Search results</h2>
            </div>
            <div className={styles.SearchResults}>
                {content}
            </div>
        </div>
    );
}

export default SearchResults;
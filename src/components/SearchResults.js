import React, { useState } from "react";
import Tracklist from "./Tracklist";
import styles from "../css/SearchResults.module.css";

function SearchResults(props) {

    return (
        <div className={styles.SearchResults}>
            <h2>Search results</h2>
            <Tracklist results={props.results}/>
        </div>
    );    
}

export default SearchResults;
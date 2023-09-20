import React, { useState } from "react";
import Tracklist from "./Tracklist";

function SearchResults(props) {

    return (
        <>
            <h2>Search results</h2>
            <Tracklist results={props.results}/>
        </>
    );    
}

export default SearchResults;
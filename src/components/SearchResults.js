import React, { useState } from "react";
import Tracklist from "./Tracklist";

const SONGS = [
    {
        id: 0,
        name: 'song 1',
        artist: 'artist 1',
        album: 'album artist 1'
    },
    {
        id: 1,
        name: 'song 2',
        artist: 'artist 2',
        album: 'album artist 2'
    },
    {
        id: 2,
        name: 'song 3',
        artist: 'artist 3',
        album: 'album artist 3'
    },
    {
        id: 3,
        name: 'song 4',
        artist: 'artist 4',
        album: 'album artist 4'
    },
];

function SearchResults() {

    const [results, setResults] = useState(SONGS);

    return (
        <>
            <h2>Search results</h2>
            <Tracklist results={results}/>
        </>
    );    
}

export default SearchResults;
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import styles from "./css/App.module.css";

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

function App() {

  const [request, setRequest] = useState("");
  const [results, setResults] = useState([]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setResults(SONGS);
  }


  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>Jammming</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <SearchBar onSubmit={handleOnSubmit} />
        </div>
      </div>
      <div className={styles.content}>
        <SearchResults results={results} />
      </div>
    </div>
  );
}

export default App;

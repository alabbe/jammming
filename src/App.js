import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import styles from "./css/App.module.css";
import Playlist from './components/Playlist';

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
  const [playlist, setPlaylist] = useState([]);
  const [playListName, setPlaylistName] = useState("Your custom playlist's name");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setResults(SONGS);
  }

  const handleOnClickAdd = (event) => {
    let selectedTrackId = event.target.value;

    setPlaylist((prev) => {
      let searchArray = prev.filter((item) =>item.id === results[selectedTrackId].id);
      if (searchArray.length === 0) {
        return [...prev, results[selectedTrackId]];
      }
      return prev;
    });
  }

  const handleOnClickRemove = (event) => {
    let selectedTrackId = event.target.value;
    console.log("remove item:", playlist[selectedTrackId]);
    setPlaylist((prev) => prev.filter((item) => item.id != selectedTrackId));
  };

  const handleOnChangePlaylistName = (event) => {
    setPlaylistName(event.target.value);
  };

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
        <SearchResults results={results} onClick={handleOnClickAdd} origin="tracklist"/>
      </div>
      <div className={styles.content}>
        <Playlist playlist={playlist} onClick={handleOnClickRemove} onChange={handleOnChangePlaylistName} origin="playlist" name={playListName}/>
      </div>
    </div>
  );
}

export default App;

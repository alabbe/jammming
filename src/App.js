import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import styles from "./css/App.module.css";
import Playlist from './components/Playlist';
import Spotify from './util/Spotify';
import Login from './components/Login';

const SONGS = [
  {
    id: 0,
    name: 'song 1',
    artist: 'artist 1',
    album: 'album artist 1',
    uri: 'spotify:track:1E9HERI5XdI9ZZIgCw51QS'
  },
  {
    id: 1,
    name: 'song 2',
    artist: 'artist 2',
    album: 'album artist 2',
    uri: 'spotify:track:5yiMnljXWHnI9ToPoXbpPZ'
  },
  {
    id: 2,
    name: 'song 3',
    artist: 'artist 3',
    album: 'album artist 3',
    uri: 'spotify:track:7IXvqtnsBbJM7IEDQetR9b'
  },
  {
    id: 3,
    name: 'song 4',
    artist: 'artist 4',
    album: 'album artist 4',
    uri: 'spotify:track:1OJNE7ER48x17Nj2zyI6VY'
  },
];

function App() {

  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playListName, setPlaylistName] = useState("Your custom playlist's name");
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);


  useEffect(() => {
    const token = Spotify.getAccessTokenFromCurrentPath();

    if (token) {
      //console.log("got token from url", token);
      console.log("current token:", spotifyAccessToken);
      console.log("current expirationTime", expirationTime);
      if (token != spotifyAccessToken && !expirationTime) {
        console.log("got new token from url", token);
        setSpotifyAccessToken(token);
        setExpirationTime(Date.now() + Spotify.getExpirationTimeFromCurrentPath()); // a remplacer par get expiration time
      }
    }
  }, []);


  const isTimeout = () => {
    const currentTime = Date.now();
    if (expirationTime) {
      console.log("initial expiration time: ", expirationTime);
      console.log("current time: ", currentTime);
      if (expirationTime <= currentTime) {
        console.log("Time out!");
        setSpotifyAccessToken(null);
        setExpirationTime(null);
        return true;
      }
      return false;
    }
  }

  const handleOnSubmitSearch = (event) => {
    event.preventDefault();
    if (!isTimeout()) {
      setResults(SONGS);
    }
  }

  const handleOnClickAdd = (event) => {
    let selectedTrackId = event.target.value;

    setPlaylist((prev) => {
      let searchArray = prev.filter((item) => item.id === results[selectedTrackId].id);
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

  const handleAuthorizeSpotify = () => {
    Spotify.connectToSpotify();
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>Jammming</h1>
        <Login isExpired={expirationTime} isAuthorized={spotifyAccessToken} onClick={handleAuthorizeSpotify} />
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <SearchBar onSubmit={handleOnSubmitSearch} />
        </div>
      </div>
      <div className={styles.content}>
        <SearchResults results={results} onClick={handleOnClickAdd} origin="tracklist" />
      </div>
      <div className={styles.content}>
        <Playlist playlist={playlist} onClick={handleOnClickRemove} onChange={handleOnChangePlaylistName} origin="playlist" name={playListName} />
      </div>
    </div>
  );
}

export default App;

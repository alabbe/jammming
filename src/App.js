import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import styles from "./css/App.module.css";
import Playlist from './components/Playlist';
import Spotify from './util/Spotify';
import Login from './components/Login';

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playListName, setPlaylistName] = useState("");
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);


  useEffect(() => {
    const token = Spotify.getAccessTokenFromCurrentPath();
    if (token) {
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
      /* console.log("initial expiration time: ", expirationTime);
      console.log("current time: ", currentTime); */
      if (expirationTime <= currentTime) {
        console.log("Time out!");
        setSpotifyAccessToken(null);
        setExpirationTime(null);
        return true;
      }
      return false;
    }
  }

  const handleOnSubmitSearch = async (event) => {
    event.preventDefault();
    if (!isTimeout() && searchQuery) {
      console.log("search query: ", searchQuery);
      let jsonTracks = Spotify.search(searchQuery, spotifyAccessToken);
      let searchResults;
      jsonTracks.then((json) => {
        if (!json.tracks) {
          searchResults = [];
        }
        searchResults = json.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
        setResults([...searchResults]);
      });
    }
  };

  const handleOnChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleOnClickAdd = (event) => {
    let track = results.find((item) => item.id === event.target.value);

    setPlaylist((prev) => {
      let searchArray = prev.filter((item) => item.id === track.id);
      if (searchArray.length === 0) {
        return [...prev, track];
      }
      return prev;
    });
  };

  const handleOnClickRemove = (event) => {
    let selectedTrackId = event.target.value;
    setPlaylist((prev) => prev.filter((item) => item.id != selectedTrackId));
  };

  const handleOnChangePlaylistName = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleAuthorizeSpotify = () => {
    Spotify.connectToSpotify();
  };


  const getTracksURI = () => {
    let uris = [];
    if (playlist) {
      playlist.forEach((item) => uris.push(item.uri));
    }
    return uris;
  };

  const handleOnSavePlaylist = async () => {
    if (playListName && !isTimeout()) {
      let response = Spotify.getUserId(spotifyAccessToken);
      response.then((json) => {
        if(json.id) {
          return Spotify.createPlaylist(playListName, json.id, spotifyAccessToken);
        }
      }).then((json) => {
          if (json.id) {
            let tracksUris = getTracksURI();
            if (tracksUris.length > 0) {
              return Spotify.savePlaylist(json.id, tracksUris, spotifyAccessToken);
            }
          }
      });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>Jammming</h1>
        <Login isExpired={expirationTime} isAuthorized={spotifyAccessToken} onClick={handleAuthorizeSpotify} />
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <SearchBar onSubmit={handleOnSubmitSearch} onChange={handleOnChangeSearch} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tracklist}>
          <SearchResults results={results} onAdd={handleOnClickAdd} origin="tracklist" />
          <Playlist playlist={playlist} onRemove={handleOnClickRemove} onChange={handleOnChangePlaylistName} onSave={handleOnSavePlaylist} origin="playlist" name={playListName} />
        </div>
      </div>
    </div>
  );
}

export default App;

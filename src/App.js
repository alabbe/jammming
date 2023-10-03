import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Spotify from "./util/Spotify";
import Login from "./components/Login";
import styles from "./css/App.module.css";

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
      setSpotifyAccessToken(token);
      setExpirationTime(
        Date.now() + Spotify.getExpirationTimeFromCurrentPath()
      );
    }
  }, []);

  useEffect(() => {
    if (searchQuery && spotifyAccessToken) {
      console.log("search query: ", searchQuery);
      let jsonTracks = Spotify.search(searchQuery, spotifyAccessToken);
      let searchResults;
      jsonTracks.then((json) => {
        if (json.tracks) {
          searchResults = json.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
          setResults([...searchResults]);
        } else {
          setResults([]);
        }
      });
    }
  }, [searchQuery, spotifyAccessToken]);

  const isTimeout = () => {
    const currentTime = Date.now();
    if (expirationTime && expirationTime <= currentTime) {
      console.log("Timed out!");
      setSpotifyAccessToken(null);
      setExpirationTime(null);
      return true;
    } else {
      return false;
    }
  };

  const handleOnSubmitSearch = async (event) => {
    event.preventDefault();
    setSearchQuery(document.getElementById("search").value);
  };

  const handleOnClickAdd = (event) => {
    let track = results.find((item) => item.id === event.target.value);
    const updatedResults = results.filter((item) => item.id !== track.id);

    setPlaylist((prev) => {
      let searchArray = prev.filter((item) => item.id === track.id);
      if (searchArray.length === 0) {
        return [...prev, track];
      }
      return prev;
    });

    setResults(updatedResults);
  };

  const handleOnClickRemove = (event) => {
    let track = playlist.find((item) => item.id === event.target.value);
    setPlaylist((prev) => prev.filter((item) => item.id !== track.id));

    setResults((prev) => {
      let searchArray = prev.filter((item) => item.id === track.id);
      if (searchArray.length === 0) {
        return [...prev, track];
      }
      return prev;
    });
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
      response
        .then((json) => {
          if (json.id) {
            return Spotify.createPlaylist(
              playListName,
              json.id,
              spotifyAccessToken
            );
          }
        })
        .then((json) => {
          if (json.id) {
            let tracksUris = getTracksURI();
            if (tracksUris.length > 0) {
              return Spotify.savePlaylist(
                json.id,
                tracksUris,
                spotifyAccessToken
              );
            }
          }
        });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Jammming</h1>
        </div>
        <Login
          isExpired={expirationTime}
          isAuthorized={spotifyAccessToken}
          onClick={handleAuthorizeSpotify}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <SearchBar onSubmit={handleOnSubmitSearch} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tracklist}>
          <SearchResults
            results={results}
            onAdd={handleOnClickAdd}
            origin="tracklist"
          />
          <Playlist
            playlist={playlist}
            onRemove={handleOnClickRemove}
            onChange={handleOnChangePlaylistName}
            onSave={handleOnSavePlaylist}
            origin="playlist"
            name={playListName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

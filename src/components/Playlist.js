import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/Playlist.module.css"

function Playlist(props) {

  let playlist = "";
  // console.log("rendering Playlist", props);
  if (props.playlist.length > 0) {
    playlist = <Tracklist results={props.playlist} onClick={props.onRemove} origin={props.origin} />;
  } else {
    playlist = <span>Your playlist is empty.</span>;
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <input type="Text" value={props.name} onChange={props.onChange} placeholder="Enter your playlist name"></input>
        <button className={styles.secondaryButton} onClick={props.onSave}>Save to Spotify</button>
      </div>
      <div className={styles.Playlist}>
        {playlist}
      </div>
    </div>
  );
}

export default Playlist;
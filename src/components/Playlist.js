import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/Playlist.module.css"

function Playlist(props) {

  let playlist = "";
  // console.log("rendering Playlist", props);
  if (props.playlist.length > 0) {
    playlist = <Tracklist results={props.playlist} onClick={props.onClick} origin={props.origin} />;
  } else {
    playlist = <span>Your playlist is empty.</span>;
  }

  return (
    <div className={styles.Playlist}>
      <div className={styles.header}>
        <h2>Playlist:</h2>
        <input type="Text" value={props.name} onChange={props.onChange} placeholder="Enter your playlist name"></input>
      </div>
      {playlist}
    </div>
  );
}

export default Playlist;
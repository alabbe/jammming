import React from "react";
import styles from "../css/Track.module.css";

function Track(props) {
  return (
    <div key={props.track.id} className={styles.Track}>
      <div className={styles.SongData}>      
        <div><span>Song's name:</span> {props.track.name}</div>
        <div><span>Artist:</span> {props.track.artist}</div>
        <div><span>Album:</span> {props.track.album}</div>
      </div>
      <div className={styles.SongActions}>      
        <button>Add to playlist</button>
      </div>
    </div>
  );
}

export default Track;
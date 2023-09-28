import React from "react";

import styles from "../css/Track.module.css";
import commonStyles from "../css/Common.module.css";

function Track(props) {

  let button = "";
  if (props.origin === "tracklist") {
    button = <button onClick={props.onClick} value={props.track.id} className={commonStyles.secondaryButton}>Add</button>
  } else {
    button =  <button onClick={props.onClick} value={props.track.id} className={commonStyles.secondaryButton}>Remove</button>
  }

  return (
    <div className={styles.Track}>
      <div className={styles.SongData}>      
        <div><span>Song's name:</span> {props.track.name}</div>
        <div><span>Artist:</span> {props.track.artist}</div>
        <div><span>Album:</span> {props.track.album}</div>
      </div>
      <div>
       {button}
      </div>
    </div>
  );
}

export default Track;
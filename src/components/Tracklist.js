import React from "react";
import Track from "./Track";
import styles from "../css/Tracklist.module.css"

function Tracklist(props) {

  const results = props.results.map(song => <Track track={song} onClick={props.onClick} key={song.id} origin={props.origin} />);

  return (
    <div className={styles.Tracklist}>
        {results}
    </div>
  );
}

export default Tracklist;
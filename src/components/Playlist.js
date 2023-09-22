import React from "react";
import Tracklist from "./Tracklist";
import styles from "../css/Playlist.module.css"

function Playlist(props) {

    let playlist = "";
    // console.log("rendering Playlist", props);
    if (props.playlist.length > 0) {
        playlist = <Tracklist results={props.playlist} onClick={props.onClick} origin={props.origin} />;
    } else {
        playlist = "Your playlist is empty.";
    }

    return (
        <div className={styles.Playlist}>
            <h2>Your custom playlist</h2>
            {playlist}
        </div>
    );
}

export default Playlist;
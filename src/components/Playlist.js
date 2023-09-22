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
            <input type="Text" value={props.name} onChange={props.onChange}></input>
            {playlist}
        </div>
    );
}

export default Playlist;
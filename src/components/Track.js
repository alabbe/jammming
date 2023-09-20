import React from "react";

function Track(props) {
  return (
    <>
      <ul key={props.track.id}>
        <li>Song's name: {props.track.name}</li>
        <li>Artist:  {props.track.artist}</li>
        <li>Album:  {props.track.album}</li>
        <li><button>Add to playlist</button></li>
      </ul>
    </>
  );
}

export default Track;
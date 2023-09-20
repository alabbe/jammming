import React from "react";

function Track(props) {
  return (
    <div key={props.track.id}>
      <div>Song's name: {props.track.name}</div>
      <div>Artist: {props.track.artist}</div>
      <div>Album: {props.track.album}</div>
      <button>Add to playlist</button>div
    </div>
  );
}

export default Track;
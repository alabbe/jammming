import React from "react";
import Track from "./Track";

function Tracklist(props) {

  const results = props.results.map(song => <li><Track track={song} /></li>);

  return (
    <div>
      <ul>
        {results}
      </ul>
    </div>
  );
}

export default Tracklist;
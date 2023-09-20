import React from "react";
import Track from "./Track";

function Tracklist(props) {

  const results = props.results.map((song) => {
    return (<Track track={song} />);
  })

  return (
    <>
      <div>
        {results}
      </div>
    </>
  );
}

export default Tracklist;
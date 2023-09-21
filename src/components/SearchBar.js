import React from "react";

function SearchBar(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <label htmlFor="search">Search song</label>
      <input type="text" id="search"></input>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
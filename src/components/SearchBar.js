import React from "react";

function SearchBar() {
  return (
    <form>
      <label htmlFor="search">Search song</label>
      <input type="text" id="search"></input>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
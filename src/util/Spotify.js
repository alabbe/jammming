const clientId = "7ab319f2b04c4882ade7c4a4ef56322b";
const redirectUri = "http://localhost:3000/callback";
const authorizeEndpoint = 'https://accounts.spotify.com/authorize';
const searchEndpoint = "https://api.spotify.com/v1/search";

const Spotify = {

  connectToSpotify() {
    let url = authorizeEndpoint + "?client_id=" + clientId + "&response_type=token&redirect_uri=" + redirectUri;
    window.location = url;
  },

  getAccessTokenFromCurrentPath() {
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

    if (accessTokenMatch) {
      return accessTokenMatch[1];
    }
  },

  getExpirationTimeFromCurrentPath() {
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (expiresInMatch) {
      let expiresIn = Number(expiresInMatch[1]) * 1000;
      return expiresIn;
    }
  },

  async search(query, token) {
    let queryString = `?q=${query}`;
    let searchType = 'track';
    let url = `${searchEndpoint}${queryString}&type=${searchType}&market=FR`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (e) {
      console.log("Unable to find results: ", e);
    }
  }
}

export default Spotify;
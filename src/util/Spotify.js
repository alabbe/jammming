const client_id = "7ab319f2b04c4882ade7c4a4ef56322b";
const redirect_uri = "http://localhost:3000/callback";
const endpoint = 'https://accounts.spotify.com/authorize';

const Spotify = {

  connectToSpotify() {
    let url = endpoint + "?client_id=" + client_id + "&response_type=token&redirect_uri=" + redirect_uri;
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
  }
}

export default Spotify;
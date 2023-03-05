import './App.css';
import React, { useState, useEffect } from "react"
import getTokenFromUrl from "./Utility"
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

/*
TODO:
 + Get list of playlists
  + Console.log
 - Search by BPM
  - Console.log
 - Transition display to be Bootstrap based
 - Show list of playlists
 - Show search bar / results
*/

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
  const [playlists, setPlaylists] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      setSpotifyToken(spotifyToken)
      spotifyApi.setAccessToken(spotifyToken)
      setLoggedIn(true)
      getNowPlaying()
    }
  })

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }

  const getPlaylists = () => {
    spotifyApi.getUserPlaylists().then((result) => {
      setPlaylists({items: result.items})
    })
    console.log(playlists);
  }

  const searchByBPM = () => {
    const query = {seed_genres: "classical,country"}
    spotifyApi.getRecommendations(query).then((result) => {
      console.log(result)
    })
    // Search for a given track
    // For each result
      // Search audio analysis
      // -- spotifyApi.getAudioAnalysisForTrack
      // -- get tempo
  }
  
  return (
    <div className="App">
      {!loggedIn && 
        <a href="http://localhost:8888/login">
          Login to Spotify
        </a>
      }
      {loggedIn && (
        <>
          <div>
            Now Playing - {nowPlaying.name}
          </div>
          <div>
            <img src={nowPlaying.albumArt} style={{height: 150}}/>
          </div>
          <button onClick={() => getNowPlaying()}> Check Now Playing </button>
          <br/>
          <button onClick={() => getPlaylists()}> Get playlists </button>
          <br/>
          <button onClick={() => searchByBPM()}> Search </button>
          <br/>

        </>
      )}
    </div>
  );
}

export default App;
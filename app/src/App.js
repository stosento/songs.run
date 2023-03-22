import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Button } from 'react-bootstrap'

import getTokenFromUrl from "./Utility";
import Login from './components/Login';
import RecommendationForm from './components/RecommendationForm';
import RecommendationResults from './components/RecommendationResults';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {

    // Set-up Token
    const spotifyToken = getTokenFromUrl().access_token;
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      setLoggedIn(true)
    }

    // Set-up Genre Data
    const getAvailableGenres = async () => {
      let resultGenres = [];
      spotifyApi.getAvailableGenreSeeds().then((result) => {
        result.genres.forEach(item => {
          let capital = item.charAt(0).toUpperCase() + item.slice(1)
          resultGenres.push({value: item, label: capital})
        });
        setAvailableGenres(resultGenres);
      })
    }
   getAvailableGenres();

  }, [])
  
  return (
    <div className="App">
      {!loggedIn && <Login/>}
      {loggedIn && (
        <>
          <h3>songs.run</h3>
          <br/>

          <RecommendationForm
            availableGenres={availableGenres}
            api={spotifyApi}
            setRecommendations={setRecommendations}
          />

          <br/>

          {recommendations.length ? (
            <>
              <RecommendationResults recommendations={recommendations}/>
            </>
          ) : <></>}
        </>
      )}
    </div>
  );
}

export default App;
import './App.css';
import React, { useState, useEffect } from "react";

import SpotifyWebApi from "spotify-web-api-js";

import {Container, InputGroup, FormControl, Button, Row, Card, Form, FormGroup} from 'react-bootstrap'

import getTokenFromUrl from "./Utility";

import Login from './components/Login';
import NowPlaying from './components/NowPlaying';
import SearchBar from './components/SearchBar';
import OptionsBar from './components/OptionsBar';
import RecommendationForm from './components/RecommendationForm';

import 'bootstrap/dist/css/bootstrap.css';
import RecommendationResults from './components/RecommendationResults';

const spotifyApi = new SpotifyWebApi();

/*
TODO:
 + Get list of playlists
  + Console.log
 - Search by BPM
  - Console.log
 - Transition display to be Bootstrap based
*/

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({});
  const [playlists, setPlaylists] = useState({})
  const [bpm, setBpm] = useState("");
  const [track, setTrack] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Set-up Token
    const spotifyToken = getTokenFromUrl().access_token;
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getRecommendations(spotifyApi.Recommen)
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted form");
    console.log(bpm)
    console.log(track)
  }
  
  return (
    <div className="App">
      {!loggedIn && <Login/>}
      {loggedIn && (
        <>
          <NowPlaying 
            trackInfo={nowPlaying} 
            onClick={setNowPlaying}
            api={spotifyApi}
          />
          <Container>
            <br/>
            <button onClick={() => getPlaylists()}> Get playlists </button>
            <br/>
            <button onClick={() => searchByBPM()}> Search </button>
          </Container>

          
          <RecommendationForm
            availableGenres={availableGenres}
            api={spotifyApi}
            setRecommendations={setRecommendations}
          />

          {recommendations.length ? (
            <>
              {console.log("have recommendations")}
              <RecommendationResults recommendations={recommendations}/>
            </>
          ) : <></>}
        </>
      )}
    </div>
  );
}

export default App;
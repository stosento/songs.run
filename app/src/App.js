import React, { useState, useEffect } from "react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import SpotifyWebApi from "spotify-web-api-js";

import getTokenFromUrl from "./Utility";
import Login from './components/Login';
import GlobalAlert from "./components/alert/GlobalAlert";
import RecommendationForm from './components/RecommendationForm';
import RecommendationResults from './components/RecommendationResults';
import SpotifyPlayer from 'react-spotify-web-playback';
import Footer from './components/Footer';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [showAlert, setShowAlert] = useState(false);
  const [globalAlert, setGlobalAlert] = useState(<GlobalAlert/>);

  const [availableGenres, setAvailableGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [playbackUris, setPlaybackUris] = useState([]);

  const populateAlert = (alert) => {
    setShowAlert(true);
    setGlobalAlert(alert);
  };

  const updatePlayback = (uri) => {
    console.log("updatePlayback", uri)
    setPlaybackUris([uri])
    console.log("after error")
  }

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
    <div className="App min-h-screen bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364]">
      {!loggedIn && <Login/>}
      {loggedIn && (
        <>
          {globalAlert}
          <h2 className="pt-3 pb-5">
                    <span className="font-extralight">my</span>
                    <span className="font-semibold">tempo</span>
                    <span className="font-extralight">.run</span>
          </h2>
          <RecommendationForm className="mb-4"
            availableGenres={availableGenres}
            api={spotifyApi}
            setRecommendations={setRecommendations}
          />
          {recommendations.length ? (
            <>
              <RecommendationResults
                recommendations={recommendations} 
                api={spotifyApi}
                setAlert={populateAlert}
                setUris={updatePlayback}
              />
            </>
          ) : <></>}
          {/* <Footer className="mt-50"/> */}
          <div className="fixed inset-x-0 bottom-0">
            <SpotifyPlayer
              token={spotifyToken}
              uris={playbackUris}
              styles={{
                bgColor: 'white'
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
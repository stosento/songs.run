/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var path = require('path');
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var uuid = require('uuid');
require('dotenv').config({path: '.env'});


// Spotify API Config
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Your client id
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const SPOTIFY_REDIRECT = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri
const FRONTEND_URI = process.env.SPOTIFY_FRONTEND_URI + '#'; // Frontend uri
const PORT = process.env.PORT || 8888;

// Garmin API Config
const GARMIN_CONSUMER_KEY = process.env.GARMIN_CONSUMER_KEY;
const GARMIN_CONSUMER_SECRET = process.env.GARMIN_CONSUMER_SECRET;
const GARMIN_BASE_URL = process.env.GARMIN_BASE_URL;

const oauth_timestamp = Math.floor(Date.now() / 1000);
const oauth_nonce = uuid.v1();
const parameters = {
  oauth_consumer_key: GARMIN_CONSUMER_KEY,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: oauth_timestamp,
  oauth_nonce: oauth_nonce,
  oauth_version: '1.0'
}

let ordered = {};
Object.keys(parameters).sort().forEach(function(key) {
  ordered[key] = parameters[key];
});

let encodedParameters = '';
for (k in ordered) {
    let encodedValue = escape(ordered[k]);
    let encodedKey = encodeURIComponent(k);
    if (encodedParameters === '') {
      encodedParameters += `${encodedKey}=${encodedValue}`;
    } else {
      encodedParameters += `&${encodedKey}=${encodedValue}`;
    } 
}

const encodedUrl = encodeURIComponent(GARMIN_BASE_URL);
encodedParameters = encodeURIComponent(encodedParameters);
const signature_base_string = `POST&${encodedUrl}&${encodedParameters}`
const signing_key = `${GARMIN_CONSUMER_SECRET}&`; //as token is missing in our case.
const oauth_signature = crypto.createHmac('sha1', signing_key).update(signature_base_string).digest().toString('base64');
const encoded_oauth_signature = encodeURIComponent(oauth_signature);

const authorization_header = `OAuth oauth_consumer_key="${GARMIN_CONSUMER_KEY}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${oauth_timestamp}", oauth_nonce="${oauth_nonce}", oauth_version="1.0", oauth_signature="${encoded_oauth_signature}"`
console.log(authorization_header);


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';
var garminKey = 'garmin_auth_state';

var app = express();

app.use(express.static(path.resolve(__dirname, './app/build')));
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

//Garmin login
app.get('/garmin/login', function(req, res) {
  var state = generateRandomString(16);

})

//Spotify login
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: SPOTIFY_REDIRECT,
      state: state
    }));
});

//Spotify callback
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: SPOTIFY_REDIRECT,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(FRONTEND_URI +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect(FRONTEND_URI +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

//Spotify refresh token
app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './app/build', 'index.html'));
});

console.log('Listening on port:', PORT);
app.listen(PORT);

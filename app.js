require('dotenv').config();

const express = require('express');
const app = express();
const hbs = require("hbs");

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
  app.get("/", (req, res, next) => res.render("index"));
app.use(express.static(__dirname + '/public'));


// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');


// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});



/* app.get("/dynamic", (req, res)=>{
  imageList =[];
  imagelist.push ({src: "public/iamges/spotify-background.jpg" , name: "backgorund"});
}) */


  
  // Retrieve an access token
   spotifyApi.clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

   spotifyApi.searchArtists()
    .then(data => {
      console.log('The received data from the API: ', data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));

// Our routes go here:
app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));


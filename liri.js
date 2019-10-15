require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var choice = process.argv[2];


var appError = function(err) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
};


//This is where the user will get concert info based on artis input.
var concert_this = function() {

    var artist = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    
        .then(
            function(response) {
                console.log(response.data);
            })
            .catch(appError());
};


var spotify_song = function() {

    var song = process.argv[3];

    spotify.search({ type: 'track', query: song , limit: 1} , function(err, data) {
        if (err) {
          appError();
        }
       
   	console.log(JSON.stringify(data, null, 2)); 
      });

    
};

var movie_this = function() {
		
		var movie = process.argv[3];
	
		axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    
    .then( function(response) {
        console.log(response.data);
     })
		.catch(appError());
	
};

var do_what_it_says = function() {
	
	fs.readFile("random.txt", "utf8", function(err, data)  {
		
		if (error) {
			return console.log(error);
		}
		
		var randomText = data.split(",");
		process.argv[2] = randomText[0];
		process.argv[3] = randomText[1];
		console.log(randomText);
		spotify_song();
		
		
	});	
	
};




//Here is where the app will take in the node inputs (process.argv[2] and [3]) and choose which function to take place.

switch (choice) {

    case "concert-this":
        concert_this();
        break;

    case "spotify-this-song":
        spotify_song();
		break;
		
	case "movie-this":
    	movie_this();
		break;
		
	case "do-what-it-says":
    	do_what_it_says();
		break;

}
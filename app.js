var express = require("express"),
	request = require("request"),
	bodyParser = require("body-parser"),
	Instagram = require("instagram-node-lib"),
	methodOverride = require("method-override"),
	passport = require("passport"),
	passportLocal = require("passport-local"),
	cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  flash = require('connect-flash'),
  db = require('./models/index.js'),
	app = express();

// Instagram Registeration
Instagram.set('client_id', 'e414a3c9de764686a4fac09be825f2f9');
Instagram.set('client_secret', 'fa16f0ae71e142f6a5b16c17ee14e2cd');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());



// Testing for using IG API
// Instagram.media.search({ lat: 48.858844300000001, lng: 2.2943506, 
// 	complete:function(example) {
// 	console.log(example);	
// 	}
// });


// Sign Up Page
app.get('/signup', function(req,res){
	res.render('signup');
});


// Log In
app.get('/login', function(req,res){
	res.render('login');
});


// Index Page, Search Bar
app.get('/', function(req,res){
	res.render('index');
});


// Results Page, Displays all searched images
app.get('/results', function(req,res){
	Instagram.media.search({lat: 48.858844300000001, lng: 2.2943506,
		complete:function(location){
			console.log("URL", location[0].images.standard_resolution.url);
			res.render('results', {location: location});		
		}
	})
})


// Using the Search Bar to get Results
app.get('/search', function(req,res){

	// Need to fix this, should be res.render
	res.redirect('results');
})


// Saved List, Displays user's saved photos
app.get('/savedlist', function(req,res){
	res.render('savedlist');
})


// Sign Up
app.post('/signup', function(req,res){
	res.redirect('results');
})


// Log In
app.post('/login', function(req,res){
	res.redirect('results');
})


// Deletes from savedlist
// Working Progress
app.delete("", function(req,res){
	res.redirect("");
})










app.listen(3000, function(){
  console.log("Party Just Started on localhost:3000");  
});
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
app.use(bodyParser.urlencoded({extended: false}));

//Using cookieSession to use cookies
app.use(cookieSession ({
	secret: 'thisismysecretkey',
	name: 'session with cookie data',
	maxage: 360000
})
);

// getting passport started
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// prepare our serialize functions
passport.serializeUser(function(user,done){
	console.log("SERIALIZED JUST RAN");
	done(null, user.id);
});


passport.deserializeUser(function(id, done){
	console.log("DESERIALZE JUST RAN");
	db.user.find({
		where: {
			id: id
		}
	})
	.done(function(error,user){
		done(error,user);
	});
});


// Sign Up Page
app.get('/signup', function(req,res){
	if(!req.user){
		res.render("signup", {username: ""});
	} else {
		res.render('index');		
	}
});


// Log In
app.get('/login', function(req,res){
	// checks if the user is logged in
	if(!req.user){
		res.render('login', {message: req.flash('loginMessage'), username: ""});		
	} else {
		res.redirect('results');
	}
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
// maybe need to add ID
app.get('/savedlist', function(req,res){
	res.render('savedlist');
})





// Sign Up User using passport
app.post('/signup', function(req,res){
	db.user.createNewUser(req.body.username, req.body.password,
	function(err){
		res.render("signup", {message: err.message, username: req.body.username});
	},
	function(success){
		res.render("index", {message: success.message});
	});
});



// Log In using passport, will authenticate 
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));


// Deletes from savedlist
// Working Progress
app.delete("", function(req,res){
	res.redirect("");
})


//Deletes the user id/session
// Not currently working, errors no method 'logout'
app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});



// Testing for using IG API
// Instagram.media.search({ lat: 48.858844300000001, lng: 2.2943506, 
// 	complete:function(example) {
// 	console.log(example);	
// 	}
// });






app.listen(3000, function(){
  console.log("Party Just Started on localhost:3000");  
});
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
  gm = require('googlemaps'),
  db = require('./models/index.js'),
	app = express();

// Instagram Registeration
Instagram.set('client_id', process.env.INSTAGRAM_KEY);
Instagram.set('client_secret', process.env.INSTAGRAM_SECRET);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

//Using cookieSession to use cookies
app.use(cookieSession ({
	secret: process.env.COOKIESESSION_KEY,
	name: 'session with cookie data',
	maxage: 500000
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
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});


// Results Page, Displays all searched images
app.get('/results', function(req,res){
	Instagram.media.search({lat: 48.858844300000001, lng: 2.2943506,
		complete:function(locations){
			res.render('results', {
				locations: locations,
				isAuthenticated: req.isAuthenticated(),
				user: req.user
			});		
		}
	})
})


// Using the Search Bar to get Results
app.get('/search', function(req,res){
	var location = req.query.searchLoc;
	console.log("Querying:",location);

	// Using google maps


	Instagram.media.search({lat: 48.858844300000001, lng: 2.2943506,
		complete:function(locations){
			res.render('results',{
				isAuthenticated: req.isAuthenticated(),
				locations: locations,
				user: req.user
			})
		}
	})
})


// Saved List, Displays user's saved images
app.get('/savedlist/:id', function(req,res){
	var id = Number(req.params.id);
	db.image.findAll({
		where: {
			userId: id
		}
	}).success(function(foundImage){
		console.log("FOUNDIMAGE ID: "+foundImage[1].dataValues.id)
		res.render('savedlist',{
			images: foundImage,
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		})
	})
})



// Sign Up User using passport
app.post('/signup', function(req,res){
	db.user.createNewUser(req.body.username, req.body.password,
	function(err){
		res.render("signup", {message: err.message, username: req.body.username});
	},
	function(success){
		res.render("index", {
			message: success.message,
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	});
});


// Log In using passport, will authenticate 
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));


// Saving the picture to saved list
app.post('/save/:id', function(req,res){
	var id = Number(req.params.id);
	db.user.find(id)
		.success(function(foundUser){
			db.image.create({
				url: req.body.img
			}).success(function(newImage){
				foundUser.addImage(newImage)
				.success(function(){
					res.redirect('/savedlist/'+foundUser.id)
				})
			})
		})
	})


// Deletes from savedlist, deletes by image id
// Working Progress
app.delete("/delete/:id", function(req,res){
	var id = Number(req.params.id);
	db.image.find({
		where: {
			id: id
		}
	}).success(function(foundImage){
		foundImage.destroy()
			.success(function(destroyedImage){
				console.log("Image destoryed: "+destroyedImage)
				res.redirect("/");
			})
	})
})


//Deletes the user id/session
// Not currently working, errors no method 'logout'
app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});


// 404 page to redirect when wrong url
app.get('*', function(req,res){
	res.status(404);
	res.render('404');
})


// Testing for using IG API
// Instagram.media.search({ lat: 48.858844300000001, lng: 2.2943506, 
// 	complete:function(example) {
// 	console.log(example);	
// 	}
// });






app.listen(3000, function(){
  console.log("Party Just Started on localhost:3000");  
});
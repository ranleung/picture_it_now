var express = require("express"),
	request = require("request"),
	bodyParser = require("body-parser"),
	Instagram = require("instagram-node-lib"),
	methodOverride = require("method-override"),
	app = express();

// Instagram Registeration
Instagram.set('client_id', 'e414a3c9de764686a4fac09be825f2f9');
Instagram.set('client_secret', 'fa16f0ae71e142f6a5b16c17ee14e2cd');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());




// Instagram.media.search({ lat: 48.858844300000001, lng: 2.2943506, 
// 	complete:function(example) {
// 	console.log(example);	
// 	}
// });


app.get('/', function(req,res){
	Instagram.media.search({lat: 48.858844300000001, lng: 2.2943506,
		complete:function(location){
		res.render('index', {location: location});			
		// console.log(location.data[0].images.standard_resolution.url);
		
		console.log(location[0])
		}
	})
});








app.listen(3000, function(){
  console.log("Party Just Started on localhost:3000");  
});
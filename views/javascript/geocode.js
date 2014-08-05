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
  connect = require('connect'),
	app = express();

Instagram.set('client_id', process.env.INSTAGRAM_KEY);
Instagram.set('client_secret', process.env.INSTAGRAM_SECRET);

Instagram.media.likes({ media_id: 3 });
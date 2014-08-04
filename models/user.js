var bcrypt = require('bcrypt');
var passport = require("passport");
var passportLocal = require("passport-local");
var salt = bcrypt.genSaltSync(10);

module.exports = function (sequelize, DataTypes){
	var User = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				len: [6, 30],
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		}
	},
	
	{
		classMethods: {
			associate: function(db){
				User.hasMany(db.image);
			},
			encryptPass: function(password){
				var hash = bcrypt.hashSync(password, salt);
				return hash;
			},
			comparePass: function(userpass, dbpass){
				return bcrypt.compareSync((userpass), dbpass);
			},
			createNewUser: function(username, password, err, success){
				if(password.length < 6){
					err({message: "Password should be more than six characters"});
				} else {
					User.create({
						username:username,
						password: this.encryptPass(password)
					}).error(function(error){
						console.log(error);
						if(error.username){
							err({message: "Your username should be at least 6 characters long", username: username});
						} else {
							err({message: "An account with that username already exists", username: username});
						}
					}).success(function(user){
						success({message: "Account created, please log in now"})
					});
				}
			},

		} // close inner classMethods
	} // close outer classMethods
	); // close define User

	// Using passport local 
	passport.use(new passportLocal.Strategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},

	function(req, username, password, done){
		// find a user in the databse
		User.find({
			where: {
				username: username
			}
		})
		// when found,
		.done(function(error,user){
			if(error){
				console.log(error);
				return done(err, req.flash('loginMessage', 'Oops! Something went wrong.'));
			}
			if (user === null){
				return done(null, false, req.flash('loginMessage', 'Username does not exist.'));
			}
			if((User.comparePass(password, user.password)) !== true){
				return done(null, false, req.flash('loginMessage', 'Invalid Password'));
			}
			done(null, user);
		})
	}));


	return User;
} // close User function
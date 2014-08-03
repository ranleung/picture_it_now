var bcrypt = require('bcrypt');
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
				User.hasMany(db.photo);
			}
		}
	});
	return User;
}

function Photo(sequelize, DataTypes){
	var Photo = sequelize.define('photo', {
		url: DataTypes.TEXT,
		userId: {
			type: DataTypes.INTEGER,
			foreignKey: true
		}
	},

	{
		classMethods: {
			associate: function(db){
				Photo.belongsTo(db.user);
			}
		}
	})
	return Photo;
}

module.exports = Photo;
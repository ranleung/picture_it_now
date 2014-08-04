
function Image(sequelize, DataTypes){
	var Image = sequelize.define('image', {
		url: DataTypes.TEXT,
		userId: {
			type: DataTypes.INTEGER,
			foreignKey: true,
		}
	},

	{
		classMethods: {
			associate: function(db){
				Image.belongsTo(db.user);
			}
		}
	})
	return Image;
}

module.exports = Image;
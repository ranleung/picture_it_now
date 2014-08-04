var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})


// testing out database
// db.user.create({username: "Johnnnnn", password: "Doe"});

// db.image.create({url: "http://scontent-a.cdninstagram.com/hphotos-xpa1/t51.2885-15/926554_663829090369577_576874220_n.jpg", userId: 1});


module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)

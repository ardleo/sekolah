var db = {};
var Sequelize = require('sequelize');
var sequelize = new Sequelize('zurmo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
  
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
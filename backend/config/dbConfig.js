require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/userModels')(sequelize, Sequelize);
db.post = require('../models/postModels')(sequelize, Sequelize);
db.comment = require('../models/commentModels')(sequelize, Sequelize);

sequelize.authenticate()
  .then(() => { console.log('La connexion à la base de donnée a été établie avec succès'); })
  .catch(err => { console.log(err, 'La connexion à la base de donnée a échoué'); });

module.exports = db;
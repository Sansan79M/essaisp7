const env = require ('./dbConnect');
const Sequelize  = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password,
  {  host: env.host,
    dialect: env.dialect,
    //operatorsAliases: false,
    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require ('../models/userModels')(sequelize, Sequelize);
db.post = require ('../models/postModels')(sequelize, Sequelize);

sequelize.authenticate()
  .then(() => { console.log('La connexion à la base de donnée a été établie avec succès'); })
  .catch(err => { console.log(err, 'La connexion à la base de donnée a échoué'); });

module.exports = db;
const Sequelize  = require('sequelize');
const sequelize = new Sequelize('database_groupomania', 'root.p7', 'ocr2020',
  { host: 'localhost',
    dialect: 'mysql',
  });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require ('./userModels')(sequelize, Sequelize);
db.post = require ('./postModels')(sequelize, Sequelize);

sequelize.authenticate()
  .then(() => { console.log('La connexion à la base de donnée a été établie avec succès'); })
  .catch(err => { console.log(err, 'La connexion à la base de donnée a échoué'); });

module.exports = db;
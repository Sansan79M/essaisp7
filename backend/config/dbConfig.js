require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DEV, process.env.USER_DEV, process.env.PASSWORD_DEV,
  {
    host: process.env.HOST_DEV,
    dialect: process.env.DIALECT_DEV,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone:'+01:00',
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

//Importation des différents fichiers models
db.user = require('../models/userModels')(sequelize, Sequelize);
db.post = require('../models/postModels')(sequelize, Sequelize);
db.comment = require('../models/commentModels')(sequelize, Sequelize);

//Jointures entre les tables
db.user.hasMany(db.post, {onDelete: 'cascade', hooks:true}); //L'utilisateur est l'auteur de plusieurs posts
db.user.hasMany(db.comment, {onDelete: 'cascade', hooks:true}); //L'utilisateur est l'auteur de plusieurs commentaires
db.post.hasMany(db.comment, {onDelete: 'cascade', hooks:true}); //Un post peut avoir plusieurs commentaires

db.post.belongsTo(db.user, { foreignKey: 'userId'}); //Un post n'a qu'un utilisateur
db.comment.belongsTo(db.user, { foreignKey: 'userId'}); //Un commentaire n'a qu'un utilisateur
db.comment.belongsTo(db.post, { foreignKey: 'postId'}); //Un commentaire n'a qu'un post

sequelize.authenticate()
  .then(() => { console.log('La connexion à la base de donnée a été établie avec succès'); })
  .catch(err => { console.log(err, 'La connexion à la base de donnée a échoué'); });

module.exports = db;
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

//Paramétrages des clés étrangères
db.user.hasMany(db.post, {/*foreignKey: 'userId', */onDelete: 'cascade', hooks:true/*, as: 'userPosts'*/}); //L'utilisateur est l'auteur de plusieurs posts
db.user.hasMany(db.comment, {/*foreignKey: 'userId',*/ onDelete: 'cascade', hooks:true/*, as: 'userComments'*/}); //L'utilisateur est l'auteur de plusieurs commentaires
db.post.hasMany(db.comment, {/*foreignKey: 'postId',*/ onDelete: 'cascade', hooks:true/*, as: 'postComments'*/}); //Un post peut avoir plusieurs commentaires

db.post.belongsTo(db.user, { foreignKey: 'userId'/*, as: 'userPosts'*/}); //Un post n'a qu'un utilisateur
//db.comment.belongsTo(db.user, { foreignKey: 'userId', as: 'userComments'}); //Un commentaire n'a qu'un utilisateur
//db.comment.belongsTo(db.post, { foreignKey: 'postId', as: 'postComments'}); //Un commentaire n'a qu'un post

sequelize.authenticate()
  .then(() => { console.log('La connexion à la base de donnée a été établie avec succès'); })
  .catch(err => { console.log(err, 'La connexion à la base de donnée a échoué'); });

module.exports = db;
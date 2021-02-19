require('dotenv').config()

//Dépendances requises
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Fichiers de projet requis
const db = require('./config/dbConfig')
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');

db.sequelize.sync({/*force:true*/ }); //synchronisation de la BDD et remise à 0

//Middlewares de sécurité des requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  next();
});


//Manipulation du JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


module.exports = app;

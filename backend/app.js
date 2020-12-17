require('dotenv').config()

//Dépendances requises
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//Fichiers de projet requis
const db = require('./config/dbConfig')
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

db.sequelize.sync();

//Middlewares de sécurité 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  next();
});


//Pour les médias téléchargés dans les messages
app.use('/medias', express.static(path.join(__dirname, 'medias')));

//Pour les photos des profils utilisateurs
app.use('/faces', express.static(path.join(__dirname, 'faces')));

//Manipulation du JSON
app.use(bodyParser.json());

//Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);

//Message de test du localhost
app.get("/", (req, res) => {
  res.json({ message: "Vérification que l'API backend fonctionne" });
});


module.exports = app;

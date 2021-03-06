const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const xss = require('xss');

const db = require('../config/dbConfig');
const User = db.user;

//Cryptage du token
const TOKEN = process.env.TOKEN;


//Création d'un nouveau nouvel utilisateur
exports.signup = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
    attributes :['email']
  })
  .then(user => {
    if (!user){
      bcrypt.hash((req.body.password), 10)
      .then(hash => {
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          isAdmin: false
        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la création d'un nouveau compte utilisateur" }));
      })
    } else {
      return res.status(401).json({ error: "L'adresse email est déjà enregistrée !" });
    }
  })
    .catch(error => res.status(500).json({ error }));
};


//Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: xss(req.body.email) }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Le mot de passe est incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, email: user.email, isAdmin: user.isAdmin },
              TOKEN,
              { expiresIn: '12h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error: "Une erreur provenant du mot de passe est survenue", content: error }));
    })
    .catch(error => res.status(500).json({ error: "Une erreur provenant de l'email est survenue", content: error }));
};


//Consultation du profil par l'utilisateur
exports.userProfile = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'username', 'email', 'service', 'isAdmin']
  })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Une erreur d'affichage du profil est survenue" }));
};


//Consultation de tous les profils utilisateurs
exports.coworkers = (req, res, next) => {
  User.findAll({
    order: [['username', 'ASC']], //affichage des salariés par ordre alphabétique
    attributes: ['id', 'username', 'email', 'service', 'isAdmin', 'createdAt']
  })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Une erreur d'affichage des profils est survenue" }));
};


//Modification du profil par l'utilisateur
exports.modifyProfile = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      bcrypt.hash((req.body.password), 10)
        .then((hash) => {
          user.update({
            where: {
              userId: req.params.userId,
            },
            username: req.body.username,
            email: req.body.email,
            service: req.body.service,
            password: hash
          })
        })
        .then(() => res.status(200).json({ message: 'Le profil a bien été modifiée !' }))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la modification du profil" }));
    });
}


//Suppression du profil utilisateur
exports.deleteProfile = (req, res, next) => {
  User.findOne({ where: { id: req.body.id } })
    .then(() => {
      User.destroy({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: "Le profil a bien été supprimé !" }))
    })
    .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la suppression du profil" }));
};
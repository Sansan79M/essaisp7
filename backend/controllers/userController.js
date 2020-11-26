const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const xss = require('xss');
const regex = require('../utils/regex');

const db = require('../models/dbConnect');
const User = db.user;

//Cryptage du token
const TOKEN = process.env.TOKEN;

//Création d'un nouveau nouvel utilisateur
exports.signup = (req, res, next) => {
  console.log("signup #######################")
  const validEmail = regex.validEmail(req.body.email);
  if (validEmail.error) {
    return res.status(401).json(validEmail, { error: "L'email n'est pas valide !" })
  }
  const validPassword = regex.validPassword(req.body.password);
  if (validPassword.error) {
    return res.status(401).json(validPassword, { error: "Le mot de passe n'est pas valide !" })
  }
  /*if (email == null|| username == null || password == null){
    return res.status(400).json({ error: "Tous les champs ne sont pas remplis"})
  }*/
  /*if (username.length >=50 || username.length <=4){
    return res.status(400).json({ error: "Le nom d'utilisateur doit comporter entre 4 et 50 caractères"})
  }*/
  bcrypt.hash((req.body.password), 10)
    .then(hash => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })
        .then(success => { return res.status(200).json(success); })
        .catch(err => {
          console.log('############## usercreate error...', err.errors[0].message);
          return res.status(404).send(new Error(err.errors[0].message));
        });

    })
    .catch(err => {
      console.log('############## bcrypt error...', err);
          return res.status(501).send(err);
    });
}

//Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
       res.status(401).json({ error: 'Utilisateur non trouvé !' });
       return;
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
             res.status(401).json({ error: 'Le mot de passe est incorrect !' });
             return;
          }
           res.status(200).json({
            userId: user.id,
            email: user.email,
            token: jwt.sign(
              { userId: user.id },
              TOKEN,
              { expiresIn: '12h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error: "Une erreur inconnue est survenue", content: error }));
    })
    .catch(error => res.status(500).json({ error: "Une 2e erreur inconnue est survenue", content: error }));
};


//Consultation du profil par l'utilisateur
exports.userProfile = (req, res, next) => {
  User.findOne({
    attributes: ['username'],
    where: { username: req.body.username }
  })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
}


//Modification du profil par l'utilisateur
exports.modifyProfile = (req, res, next) => {
    User.findOne({ id: req.params.id })
      .then(() => {
        //Ajout d'un avatar
        const img = new img({
          ...imgObject,
          face: `${req.protocol}://${req.get('host')}/faces/${req.file.filename}`
      });
      img.save()
          .then(() => res.status(200).json({ message: "L'avatar' a été enregistrée !" }))
          .catch(error => res.status(400).json({ error }));
        //Mise à jour du profil
        User.updateOne({ userId: user.id })
          .then(() => res.status(200).json({ message: 'Le profil a été modifié !' }))
          .catch(error => res.status(400).json({ error }));
      });
}

//Suppression du profil utilisateur
exports.deleteProfile = (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then(() => {
      User.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Le profil a été supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    });
};
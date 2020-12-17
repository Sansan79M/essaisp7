const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { user } = require('../config/dbConfig');
//const xss = require('xss');

const db = require('../config/dbConfig');
const User = db.user;

//Cryptage du token
const TOKEN = process.env.TOKEN;

//Création d'un nouveau nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt.hash((req.body.password), 10)
    .then(hash => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
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
            token: jwt.sign(
              { userId: user.id },
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
    where: { userId: req.params.id },
    attributes: ['username', 'email', 'service', 'bio', 'face']
  })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error : "Une erreur d'affichage du profil est survenue" }));
  
  /*User.findOne({
    where: {id : req.params.id},
  })
  .then(userId => {
		res.status(200).send({
          userId: user.id,
          username: user.username,
          email: user.email,
          service: user.service,
          bio: user.bio,
          face: user.face,
          token : TOKEN
    });
  })
  .catch(error => res.status(500).send({ error : "Une erreur d'affichage du profil est survenue" }));*/
 
  
    
};


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
        User.update({ userId: user.id })
          .then(() => res.status(200).json({ message: "Le profil a été modifié !" }))
          .catch(error => res.status(400).json({ error: "Erreur dans la modification du profil" }));
      });
}

//Suppression du profil utilisateur
exports.deleteProfile = (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then(() => {
      User.destroy({ id: req.params.id })
        .then(() => res.status(200).json({ message: "Le profil a bien été supprimé !" }))
        .catch(error => res.status(400).json({ error : "Erreur dans la suppression du profil" }));
    });
};
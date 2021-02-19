const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

//Router des utilisateurs
router.post('/signup', userCtrl.signup); //Création d'un nouvel utilisateur
router.post('/login', userCtrl.login); //Connexion d'un utilisateur
router.get('/profile/:id', auth, userCtrl.userProfile); //Consultation du profil par l'utilisateur
router.put('/modify/:id', auth, userCtrl.modifyProfile); //Modification du profil par l'utilisateur
router.delete('/delete', auth, userCtrl.deleteProfile); //Suppression du profil utilisateur
router.get('/coworkers', auth, userCtrl.coworkers); //Consultation de la liste des profils utilisateurs

module.exports = router;


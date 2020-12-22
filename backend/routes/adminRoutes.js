const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

//const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

router.get('/news', postCtrl.listPosts); //Affiche le fil d'actualité
router.delete('/delete/:id', postCtrl.deletePost); //Supprimer un message

router.get('/read/:postId', commentCtrl.readAllComment); //Affiche la liste des commentaires
router.delete('/delete/:id', commentCtrl.deleteComment); //Supprimer un commentaire

router.delete('/delete', userCtrl.deleteProfile); //Suppression du profil utilisateur

module.exports = router;


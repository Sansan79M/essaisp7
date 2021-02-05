const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentController');

const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

//Router des commentaires
router.get('/read/:postId', auth, commentCtrl.readAllComments); //Affiche la liste des commentaires d'un post
router.post('/create', auth, commentCtrl.createComment); //Créer un nouveau commentaire
router.get('/readone/:id', auth, commentCtrl.readOneComment); //Affiche un commentaire
router.put('/update/:id', auth, commentCtrl.updateComment); //Modifier un commentaire
router.delete('/delete/:id', auth, commentCtrl.deleteComment); //Supprimer un commentaire
router.put('/signal/:id', commentCtrl.signalComment); //Signaler un commentaire
router.get('/readall', auth, commentCtrl.readComments); //Affiche la liste des commentaires signalés

module.exports = router;
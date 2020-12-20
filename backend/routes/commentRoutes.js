const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentController');

//const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

//Router des commentaires
router.get('/read/:postId', commentCtrl.readAllComment); //Affiche la liste des commentaires
router.post('/create', commentCtrl.createComment); //Créer un nouveau commentaire
router.get('/readone/:id', commentCtrl.readOneComment); //Affiche un commentaire
router.put('/update/:id', commentCtrl.updateComment); //Modifier un commentaire
router.delete('/delete/:id', commentCtrl.deleteComment); //Supprimer un commentaire

module.exports = router;
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token
const multer = require('../middleware/multer-config'); //Gestion des medias

//Router des posts
router.get('/news', auth, postCtrl.listPosts); //Affiche le fil d'actualité
router.post('/create',  postCtrl.createPost); //Créer un nouveau message 
router.get('/post', auth, postCtrl.getOnePost); //Affiche un message
router.put('/update', auth, multer, postCtrl.updatePost); //Modifier un message
router.delete('/delete', auth, multer, postCtrl.deletePost); //Supprimer un message
router.post('/like', auth, postCtrl.likePost); //Liker les messages

//Router des commentaires
//router.post('comment', auth, postCtrl.createComment); //Créer un commentaire
//router.get('/comments', auth, postCtrl.getAllComments); //Affiche tous les commentaires correspondants à un message
//router.delete('/comment/delete', auth, postCtrl.deleteComment); //Supprimer un commentaire

module.exports = router;
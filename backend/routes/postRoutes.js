const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

//const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token
const multer = require('../middleware/multer-config'); //Gestion des medias

//Router des posts
router.get('/news', postCtrl.listPosts); //Affiche le fil d'actualité
router.post('/create', postCtrl.createPost); //Créer un nouveau message 
router.get('/post/:id',  postCtrl.getOnePost); //Affiche un message
router.put('/update',  multer, postCtrl.updatePost); //Modifier un message
router.delete('/delete',  multer, postCtrl.deletePost); //Supprimer un message
router.post('/like',  postCtrl.likePost); //Liker les messages

//Router des commentaires
//router.post('comment', auth, postCtrl.createComment); //Créer un commentaire
//router.get('/comments', auth, postCtrl.getAllComments); //Affiche tous les commentaires correspondants à un message
//router.delete('/comment/delete', auth, postCtrl.deleteComment); //Supprimer un commentaire

module.exports = router;
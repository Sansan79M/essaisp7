const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

//const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

//Router des posts
router.get('/news', postCtrl.listPosts); //Affiche le fil d'actualité
router.post('/create', postCtrl.createPost); //Créer un nouveau message 
router.get('/post/:id', postCtrl.getOnePost); //Affiche un message
router.put('/update',  postCtrl.updatePost); //Modifier un message
router.delete('/delete', postCtrl.deletePost); //Supprimer un message

module.exports = router;
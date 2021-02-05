const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token

//Router des posts
router.get('/news', auth, postCtrl.listPosts); //Affiche le fil d'actualité
router.post('/create', auth, postCtrl.createPost); //Créer un nouveau message 
router.get('/post/:id',  auth, postCtrl.getOnePost); //Affiche un message
router.put('/update/:id',  auth, postCtrl.updatePost); //Modifier un message 
router.delete('/delete/:id', auth, postCtrl.deletePost); //Supprimer un message 
router.put('/signal/:id', postCtrl.signalPost); //Signaler un message

module.exports = router;
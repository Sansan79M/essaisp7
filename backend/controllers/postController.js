const post = require('../models/postModels');
const fs = require('fs');

const db = require('../models/dbConnect');
const Post = db.post;

//Affiche le fil d'actualité
exports.listPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}


//Créer un nouveau message 
exports.createPost = (req, res, next) => {
    const post = new post({
        ...postObject,
        media: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(200).json({ message: 'Le message a été enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};


//Affiche un message
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        attributes: ['userId', 'title', 'description', 'media', 'dtpost', 'likes'],
        where: { id: req.params.id }
     })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
}

//Modifier un message
exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId === req.body.userId) {
                const postObject = req.file ?
                    {
                        ...JSON.parse(req.body.post),
                        imageUrl: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
                    } : { ...req.body };
                post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le message a été modifiée !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier le message' });
            }
        });
}

//Supprimer un message
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId === req.body.userId) {
                const filename = post.imageUrl.split('/medias/')[1];
                fs.unlink(`medias/${filename}`, () => {
                    post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Le message a été supprimée !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer le message' });
            }
        });
};


//Liker les messages
exports.likePost = (req, res, next) => {
    if (post.userId.like = 0) {
        //L'utilisateur ajoute son like
        Post.updateOne({ _id: req.params.id }, {
            $inc: { likes: 1 }, //incrémente de 1 le nombre de likes
        })
            .then(() => res.status(200).json({ message: "Like ajouté !" }))
            .catch(error => res.status(400).json({ error }));
    } else {
        //L'utilisateur enlève son like
        Post.findOne({ _id: req.params.id })
            .then((Post) => {
                Post.updateOne({ _id: req.params.id }, {
                    $inc: { likes: -1 }, //décrémente de 1 le nombre de likes
                })
                    .then(() => res.status(200).json({ message: "Like supprimé !" }))
                    .catch(error => res.status(400).json({ error }));
            }
            );
    }
}





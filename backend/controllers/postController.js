const post = require('../models/postModels');
const fs = require('fs');

const db = require('../models/dbConnect');
const Post = db.post;


//Créer un nouveau message 
exports.createPost = (req, res, next) => {
    Post.create({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        //media: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`,
        //likes: [],
    })
        .then(() => {
            res.status(200).json({ success: "Le message a été enregistré" })
            //Ajout d'un média
            /*const postObject = JSON.parse(req.body.post);
            console.log(req.body.post + "2222222222222222222222222");
            delete postObject.id;
            const post = new Post({
                ...postObject,
                media: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
            });
            post.save()
                .then(() => res.status(200).json({ message: "L'image' a été enregistrée !" }))
                .catch(error => res.status(400).json({ error }));*/
        })
        .catch(error => res.status(401).json({ error: "Le message n'a pas été enregistré" }));
};


//Affiche un message
exports.getOnePost = (req, res, next) => {
    console.log("Je veux afficher le message que je viens de poster")
    Post.findOne({
        /*id:req.body.id,
        userId:req.body.userId,
        username:req.body.username,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        title: req.body.title,
        description: req.body.description,*/
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'username', 'createdAt', 'updatedAt', 'title', 'description', 'media', 'likes']
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
}
console.log(Post.findOne)

//Affiche le fil d'actualité
exports.listPosts = (req, res, next) => {
    Post.findAll({
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'username', 'createdAt', 'updatedAt', 'title', 'description']
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}


//Modifier un message
exports.updatePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })
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
    Post.findOne({ id: req.params.id })
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
        Post.updateOne({ id: req.params.id }, {
            $inc: { likes: 1 }, //incrémente de 1 le nombre de likes
        })
            .then(() => res.status(200).json({ message: "Like ajouté !" }))
            .catch(error => res.status(400).json({ error }));
    } else {
        //L'utilisateur enlève son like
        Post.findOne({ id: req.params.id })
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





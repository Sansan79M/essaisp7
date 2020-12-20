const db = require('../config/dbConfig');
const Post = db.post;

//Créer un nouveau message 
exports.createPost = (req, res, next) => {
    Post.create({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
    })
        .then(() => {res.status(200).json({ success: "Le message a été enregistré" })})
        .catch(error => res.status(401).json({ error: "Le message n'a pas été enregistré" }));
};

//Affiche un message
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'title', 'description', 'createdAt', 'updatedAt']
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
}


//Affiche le fil d'actualité
exports.listPosts = (req, res, next) => {
    Post.findAll({
        attributes: ['id', 'userId', 'title', 'description', 'createdAt', 'updatedAt']
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}


//Modifier un message
exports.updatePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })
        .then((post) => {
                post.updateOne({ id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le message a été modifiée !' }))
                    .catch(error => res.status(400).json({ error }));
        });
}

//Supprimer un message
exports.deletePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })
        .then((post) => {
                    post.deleteOne({ id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Le message a été supprimée !' }))
                        .catch(error => res.status(400).json({ error }));
        });
};



const db = require('../config/dbConfig');
const Post = db.post;
const User = db.user;


//Créer un nouveau message 
exports.createPost = (req, res, next) => {
    Post.create({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
    })
        .then(success => res.status(200).json({ success: "Le message a été enregistré" }))
        .catch(error => res.status(401).json({ error: "Une erreur est survenue dans la création d'un message" }));

};


//Affiche un message
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: { id: req.params.id, },
        attributes: ['id', 'userId', 'title', 'description', 'isSignaled', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['username', 'service'],
            required: true
        }]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'affichage d'un message" }));
}


//Affiche le fil d'actualité
exports.listPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']], //affichage des messages par ordre décroissant
        attributes: ['id', 'userId', 'title', 'description', 'isSignaled', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['username', 'service'],
            required: true
        }]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue de l'affichage du fil d'actualité" }));
}


//Modifier un message
exports.updatePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            post.update({
                where: {
                    userId: req.params.userId,
                    postId: req.params.postId,
                },
                title: req.body.title,
                description: req.body.description,
            })
                .then(() => res.status(200).json({ message: 'Le message a bien été modifiée !' }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la modification du message" }));
        });
}


//Supprimer un message
exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Le message a bien été supprimée !' }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la suppression du message" }));
        });
};


//Signaler un message
exports.signalPost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            post.update({
                where: { id: req.params.id },
                isSignaled: true
            })
                .then(() => res.status(200).json({ message: 'Le message a bien été signalé !' }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenue dans le signalement du message" }));
        });
}
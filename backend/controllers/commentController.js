const db = require('../config/dbConfig');
const Comment = db.comment;

//Créer un nouveau commentaire
exports.createComment = (req, res, next) => {
    Comment.create({
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content
    })
        .then(success => res.status(200).json({ success: "Le commentaire a été enregistré" }))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'enregistrement d'un commentaire" }));
};

//Affiche un commentaire
exports.readOneComment = (req, res, next) => {
    Comment.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'postId', 'content', 'isSignaled','createdAt', 'updatedAt']
    })
        .then((comment) => { res.status(200).json(comment) })
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'affichage d'un commentaire" }));
}

//Affiche la liste des commentaires associés au post
exports.readAllComments = (req, res, next) => {
    Comment.findAll({
        where: { postId: req.params.postId },
        order: [['createdAt', 'DESC']], //affichage des commentaires par ordre décroissant
        attributes: ['id', 'userId', 'postId', 'content', 'isSignaled', 'createdAt', 'updatedAt']
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'affichage des commentaires" }));
}

//Modifier un commentaire
exports.updateComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            comment.update({
                where: {
                userId: req.params.userId,
                postId: req.params.postId,
                },
                content: req.body.content,
            })
                .then(() => res.status(200).json({ message: 'Le commentaire a bien été modifiée !' }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la modification du commentaire" }));
        });
}

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'La suppression du commentaire fonctionne' }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenue dans la suppression du commentaire" }));
        });
};

//Signaler un commentaire
exports.signalComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            comment.update({
                where: { id: req.params.id },
                isSignaled : true
            })
                .then(() => res.status(200).json({ message: 'Le commentaire a bien été signalé !' }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenue dans le signalement du commentaire" }));
        });
}

//Affiche la liste des commentaires signalés
exports.readComments = (req, res, next) => {
    Comment.findAll({
        //where: { postId: req.params.postId },
        attributes: ['id', 'userId', 'postId', 'content', 'isSignaled', 'createdAt', 'updatedAt']
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error: "Une erreur est survenue dans l'affichage des commentaires signalés" }));
}

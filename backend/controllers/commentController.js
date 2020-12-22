const db = require('../config/dbConfig');
const Comment = db.comment;

//Créer un nouveau commentaire
exports.createComment = (req, res, next) => {
    Comment.create({
        userId:req.body.userId,
        postId:req.body.postId,
        content: req.body.content
        })
        .then(success => res.status(200).json({success: "Le commentaire a été enregistré"}))
        .catch(error => res.status(400).json({ error: "Le commentaire n'a pas été enregistré"}));
};

//Affiche un commentaire
exports.readOneComment = (req, res, next) => {
    Comment.findOne({ 
        where: { id: req.params.id },
        attributes: ['id', 'userId', 'postId', 'content', 'createdAt', 'updatedAt']
     })
        .then((comment) => { res.status(200).json(comment) })
        .catch(error => res.status(400).json({ error }));
}

//Affiche la liste des commentaires
exports.readAllComment = (req, res, next) => {
    const User = db.User;
    Comment.findAll({
        where: { postId: req.params.postId },
        //include: [User],
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'userId', 'postId', 'content', 'createdAt', 'updatedAt']
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
}

//Modifier un commentaire
exports.updateComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
        .then((comment) => {
            comment.update(req.body.comment)
                .success(success => { res.status(200).json(success) })
        })
        .catch(error => res.status(400).json({ error }));
}

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.find({where: {id: req.params.id}})
        .then(async (comment) => {
            const destroyed = await comment.destroy()
            return res.status(200).json({ message: "Le commentaire est supprimé" })
        })
        .catch(error => res.status(400).json({ error }));
};



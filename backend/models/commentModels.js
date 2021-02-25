module.exports = (sequelize, Sequelize, user, post) => {
  const Comment = sequelize.define("comment", {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    postId: { type: Sequelize.INTEGER, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    isSignaled: { type: Sequelize.BOOLEAN, defaultValue: false }
  });

  //Jointures
  Comment.belongsTo(user, { foreignKey: 'userId', onDelete: 'cascade' }); //Un commentaire n'a qu'un utilisateur
  Comment.belongsTo(post, { foreignKey: 'postId', onDelete: 'cascade' }); //Un commentaire n'a qu'un post
  
  return Comment;
};


module.exports = (sequelize, Sequelize, user) => {
  const Post = sequelize.define("post", {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    title: { type: Sequelize.STRING(255), allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    isSignaled: { type: Sequelize.BOOLEAN, defaultValue: false }
  });

  //Jointure
  Post.belongsTo(user, { foreignKey: 'userId', onDelete:'cascade' }); //Un post n'a qu'un utilisateur
  
  return Post;
};


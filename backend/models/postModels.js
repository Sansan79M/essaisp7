module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    title: { type: Sequelize.STRING(255), allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    isSignaled: { type: Sequelize.BOOLEAN, defaultValue: false }
  });

  return Post;
};


module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    postId: { type: Sequelize.INTEGER, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    isSignaled: { type: Sequelize.BOOLEAN, defaultValue: false }
  });

  return Comment;
};


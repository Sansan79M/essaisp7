
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    userId: { type: Sequelize.STRING, allowNull: false},
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    media: { type: Sequelize.STRING, allowNull: true },
    likes: { type: Sequelize.INTEGER, allowNull: true },
  });
  
  return Post;
};


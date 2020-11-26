
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    userId: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    media: { type: Sequelize.STRING },
    likes: { type: Sequelize.INTEGER },
  });
  
  return Post;
};


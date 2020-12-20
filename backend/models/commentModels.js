module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    userId: { type: Sequelize.STRING, allowNull: false}, 
    postId: { type: Sequelize.STRING, allowNull: false},  
    content: { type: Sequelize.STRING, allowNull: false },
  });
  
  return Comment;
};


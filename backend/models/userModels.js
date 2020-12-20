module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
    bio: {type: Sequelize.STRING, allowNull: true},
    isAdmin: {type: Sequelize.BOOLEAN, allowNull: false},
  });

  return User;
};

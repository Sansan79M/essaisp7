module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
    service: {type: Sequelize.STRING, allowNull: true},
    bio: {type: Sequelize.STRING, allowNull: true},
    face: {type: Sequelize.STRING, allowNull: true}
  });

  return User;
};

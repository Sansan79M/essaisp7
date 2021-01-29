module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {type: Sequelize.STRING(50), allowNull: false},
    email: {type: Sequelize.STRING(50), allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
    service: {type: Sequelize.TEXT, allowNull: true},
    isAdmin: {type: Sequelize.BOOLEAN, defaultValue:false},
  });

  return User;
};

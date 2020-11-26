/*exports.init = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(60), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(80), allowNull: false, },

  });*/
  /* (async () => { await sequelize.sync({ force: true }); // Code here })(); */
// return User;
//}

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    service: {type: Sequelize.STRING},
    bio: {type: Sequelize.STRING},
    face: {type: Sequelize.STRING}
  });

  return User;
};

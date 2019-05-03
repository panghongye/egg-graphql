module.exports = (app) => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    name: STRING(30),
    email: { type: STRING(30), unique: true },
    password: STRING(32),
  });

  return User;
};

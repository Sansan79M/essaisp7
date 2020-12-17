const env = {
    host: 'localhost',
    username: 'root.p7',
    password: 'ocr2020',
    database: 'database_groupomania',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };
   
  module.exports = env;
  
const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "T5u9w3p6#", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
  define: {
    timeStamps: true,
  } 
});

 

module.exports = connection;
    
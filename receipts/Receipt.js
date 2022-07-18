const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Receipt = connection.define("receipts", {
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  fornecedor: {
    type: Sequelize.STRING,
    allowNull: false,
  }, slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  obs: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Receipt);
Receipt.belongsTo(Category);

//Receipt.sync({ force: true });

module.exports = Receipt;
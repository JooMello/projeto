const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Payment = connection.define("payments", {
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  fornecedor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
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


Category.hasMany(Payment); // UMA Categoria tem muitos artigos
Payment.belongsTo(Category); // UM Artigo pertence a uma categoria

//Payment.sync({ force: true });

module.exports = Payment;
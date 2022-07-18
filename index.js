const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require("sequelize");
const connection = require("./database/database");
const adminAuth = require("./middlewares/adminAuth");

const categoriesController = require("./categories/CategoriesController");
const usersController = require("./users/UsersController");
const paymentsController = require("./payments/PaymentsController");
const receiptsController = require("./receipts/ReceiptsController");

const Category = require("./categories/Category");
const User = require("./users/User");
const Payment = require("./payments/Payment");
const Receipt = require("./receipts/Receipt");

// View engine
app.set("view engine", "ejs");
// Sessions

app.use(
  session({
    secret: "qualquercoisa",
    cookie: {
      maxAge: 3000234433240000
    },
  })
);

// Static
app.use(express.static("public"));

//Body parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Database

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });


app.use("/", categoriesController);
app.use("/", usersController);
app.use("/", paymentsController);
app.use("/", receiptsController);

app.get("/", adminAuth, async (req, res) => {

  var totalPayments = 0;
  var totalReceipts = 0;
  var soma = 0;

  var amountP = await Payment.findOne({
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments = amountP['sum(`valor`)']

  var amountR = await Receipt.findOne({
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts = amountR['sum(`valor`)']

  var soma = parseInt(-totalPayments) + parseInt(totalReceipts);

  Payment.findAll({
    order: [
      ["id", "DESC"]
    ],
    limit: 5,
  }).then((payments) => {
    Category.findAll().then((categories) => {
      res.render("index", {
        payments: payments,
        categories: categories,
        amountP: amountP,
        totalPayments: totalPayments,
        amountR: amountR,
        totalReceipts: totalReceipts,
        soma: soma
      });
    });
  })
});




app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Payment.findOne({
      where: {
        slug: slug,
      },
    })
    .then((payment) => {
      if (payment != undefined) {
        Category.findAll().then((categories) => {
          res.render("payment", {
            payment: payment,
            categories: categories
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
      where: {
        slug: slug,
      },
      include: [{
        model: Payment
      }],
    })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            payments: category.payments,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/", adminAuth, (req, res) => {
  Receipt.findAll({
    order: [
      ["id", "DESC"]
    ],
    limit: 5,
  }).then((receipts) => {
    Category.findAll().then((categories) => {
      res.render("index", {
        receipts: receipts,
        categories: categories
      });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Receipt.findOne({
      where: {
        slug: slug,
      },
    })
    .then((receipt) => {
      if (receipt != undefined) {
        Category.findAll().then((categories) => {
          res.render("receipt", {
            receipt: receipt,
            categories: categories
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
      where: {
        slug: slug,
      },
      include: [{
        model: Receipt
      }],
    })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            receipts: category.receipts,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});


 
app.listen(8080, () => {
  console.log("O servidor está rodando!");
});

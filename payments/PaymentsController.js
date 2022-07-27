const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Payment = require("./Payment");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");
const connection = require("../database/database");
const sequelize = require("sequelize");
const {
  Op
} = require("sequelize");
var mysql = require('mysql');


//lista todos os pagamentos

router.get("/admin/payments", adminAuth, async (req, res, next) => {

  Payment.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["id", "DESC"]
    ],
    limit: 20,

  }).then((payments) => {

    Category.findAll().then((categories) => {
      res.render("admin/payments/index", {
        payments: payments,
        categories: categories,

      });
    });
  })

});


/*
// lista pagamentos em uma categoria especifica.
router.get("/admin/payments/category/:id", adminAuth, (req, res, next) => {
  paymentsListing = [];
  var selectStmt = 'SELECT * FROM guiapress.payments WHERE category=?;';
 execute(selectStmt, [req.params.category])
    .then(result => {
      const row = result.first();
      for (var i = 0; i < result.rows.length; i++) {
        var avgStars = result.rows[i].total_stars / result.rows[i].num_reviews;
        result.rows[i].stars = avgStars.toFixed(2);
        paymentsListing.push(result.rows)
      }
    })
});
*/


router.get("/admin/payments/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/payments/new", {
      categories: categories,
    });
  });
});

router.post("/payments/save", adminAuth, (req, res) => {
  var data = req.body.data;
  var fornecedor = req.body.fornecedor;
  var valor = req.body.valor;
  var obs = req.body.obs;
  var category = req.body.category;

  Payment.create({
    data: data,
    fornecedor: fornecedor,
    slug: slugify(fornecedor),
    valor: valor,
    obs: obs,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/payments");
  });
});

router.post("/payments/delete", adminAuth, (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Payment.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/payments");
      });
    } else {
      // NÃO FOR UM NÚMERO
      res.redirect("/admin/payments");
    }
  } else {
    // NULL
    res.redirect("/admin/payments");
  }
});

router.get("/admin/payments/edit/:id", adminAuth, (req, res) => {
  var id = req.params.id;
  Payment.findByPk(id)
    .then((payment) => {
      if (payment) {
        Category.findAll().then((categories) => {
          res.render("admin/payments/edit", {
            categories: categories,
            payment: payment,
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

router.post("/payments/update", adminAuth, (req, res) => {
  var id = req.body.id;
  var data = req.body.data;
  var fornecedor = req.body.fornecedor;
  var valor = req.body.valor;
  var obs = req.body.obs;
  var category = req.body.category;

  Payment.update({
      data: data,
      fornecedor,
      valor,
      obs: obs,
      categoryId: category,
      slug: slugify(fornecedor),
    }, {
      where: {
        id: id,
      },
    })

    .then(() => {
      res.redirect("/admin/payments");
    })
    .catch((err) => {
      res.send("erro:" + err);
    });
});

router.get("/payments/page/:num", (req, res) => {
  var page = req.params.num;
  var offset = 0;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 20;
  }

  Payment.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["id", "DESC"]
    ],
    limit: 20,
    offset: offset,
  }).then((payments) => {
    var next;
    if (offset + 2 >= payments.count) {
      next = false;
    } else {
      next = true;
    }

    var result = {
      page: parseInt(page),
      next: next,
      payments: payments,
    };

    Category.findAll().then((categories) => {
      res.render("admin/payments/page", {
        result: result,
        payments: payments,
        categories: categories,
      });
    });
  })
});


router.post("/payments/filter:num", adminAuth, (req, res) => {

  var category = req.body.category;

  Post.findAll({
      where: {
        categoryId: category,
      },
      include: [{
        model: Category,
      }, ],
      order: [
        ["id", "DESC"]
      ],
      limit: 20,
    })
    .then((payments) => {
      Category.findAll().then((categories) => {
        res.render("admin/payments/filter", {
          payments: payments,
          categories: categories,
        });
      })
    })
})

module.exports = router;
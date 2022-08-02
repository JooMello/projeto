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
const moment = require("moment");

//lista todos os pagamentos



router.get("/admin/payments", adminAuth, async (req, res, next) => {

  var totalPayments1 = 0;
  var totalPayments2 = 0;
  var totalPayments3 = 0;
  var totalPayments4 = 0;
  var totalPayments5 = 0;
  var totalPayments6 = 0;
  var totalPayments7 = 0;
  var totalPayments8 = 0;
  var totalPayments9 = 0;
  var totalPayments10 = 0;
  var totalPayments11 = 0;
  var totalPayments12 = 0;
  var totalPayments13 = 0;
  var totalPayments14 = 0;

  var amount1 = await Payment.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments1 = amount1['sum(`valor`)']

  var amount2 = await Payment.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalPayments3 = amount2['sum(`valor`)']
  var amount3 = await Payment.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments3 = amount3['sum(`valor`)']

  var amount4 = await Payment.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments2 = amount4['sum(`valor`)']


  var amount5 = await Payment.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments5 = amount5['sum(`valor`)']

  var amount6 = await Payment.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments6 = amount6['sum(`valor`)']



  var amount7 = await Payment.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments7 = amount7['sum(`valor`)']


  var amount8 = await Payment.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments8 = amount8['sum(`valor`)']



  var amount9 = await Payment.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments9 = amount9['sum(`valor`)']

  var amount10 = await Payment.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments10 = amount10['sum(`valor`)']


  var amount11 = await Payment.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments11 = amount11['sum(`valor`)']


  var amount12 = await Payment.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments12 = amount12['sum(`valor`)']



  var amount13 = await Payment.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments13 = amount13['sum(`valor`)']


  var amount14 = await Payment.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalPayments14 = amount14['sum(`valor`)']


  let filtroMes = await Payment.findAll({

    include: [{
      model: Category,
    }, ],
    order: [
      ["id", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jul 01 2022"), new Date("Jul 30 2022")],
      },
    },
  });
  




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
        filtroMes: filtroMes,
        totalPayments1: totalPayments1,
        totalPayments2: totalPayments2,
        totalPayments3: totalPayments3,
        totalPayments4: totalPayments4,
        totalPayments5: totalPayments5,
        totalPayments6: totalPayments6,
        totalPayments7: totalPayments7,
        totalPayments8: totalPayments8,
        totalPayments9: totalPayments9,
        totalPayments10: totalPayments10,
        totalPayments11: totalPayments11,
        totalPayments12: totalPayments12,
        totalPayments13: totalPayments13,
        totalPayments14: totalPayments14,
      });
    });
  })
});


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

  Post.findAll({
      include: [{
          model: Category,
        }, ],
        order: [
          ["id", "DESC"]
        ],
        limit: 20,
        where: {
          data: {
            [Op.between]: [new Date("Jul 01 2022"), new Date("Jul 30 2022")],
          },
        },
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
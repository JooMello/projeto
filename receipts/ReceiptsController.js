const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Receipt = require("./Receipt");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");
const sequelize = require("sequelize");
const {
  Op
} = require("sequelize");

router.get("/admin/receipts", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']

  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    raw: true,
    nest: true,
  }).then((receipts) => {
    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});

router.get("/admin/receipts/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/receipts/new", {
      categories: categories
    });
  });
});

router.post("/receipts/save", adminAuth, (req, res) => {
  var data = req.body.data;
  var fornecedor = req.body.fornecedor;
  var valor = req.body.valor;
  var obs = req.body.obs;
  var category = req.body.category;

  Receipt.create({
    data: data,
    fornecedor: fornecedor,
    slug: slugify(fornecedor),
    valor: valor,
    obs: obs,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/receipts");
  });
});

router.post("/receipts/delete", adminAuth, (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Receipt.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/receipts");
      });
    } else {
      // NÃO FOR UM NÚMERO
      res.redirect("/admin/receipts");
    }
  } else {
    // NULL
    res.redirect("/admin/receipts");
  }
});

router.get("/admin/receipts/edit/:id", adminAuth, (req, res) => {
  var id = req.params.id;
  Receipt.findByPk(id)
    .then((receipt) => {
      if (receipt != undefined) {
        Category.findAll().then((categories) => {
          res.render("admin/receipts/edit", {
            categories: categories,
            receipt: receipt,
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

router.post("/receipts/update", adminAuth, (req, res) => {
  var data = req.body.data;
  var id = req.body.id;
  var fornecedor = req.body.fornecedor;
  var valor = req.body.valor;
  var obs = req.body.obs;
  var category = req.body.category;

  Receipt.update({
      data: data,
      fornecedor: fornecedor,
      valor: valor,
      obs: obs,
      categoryId: category,
      slug: slugify(fornecedor),
    }, {
      where: {
        id: id,
      },
    })
    .then(() => {
      res.redirect("/admin/receipts");
    })
    .catch((err) => {
      res.redirect("/");
    });
});

router.get("/receipts/page/:num", (req, res) => {
  var page = req.params.num;
  var offset = 0;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 20;
  }

  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    offset: offset,
  }).then((receipts) => {
    var next;
    if (offset + 2 >= receipts.count) {
      next = false;
    } else {
      next = true;
    }

    var result = {
      page: parseInt(page),
      next: next,
      receipts: receipts,
    };

    Category.findAll().then((categories) => {
      res.render("admin/receipts/page", {
        result: result,
        receipts: receipts,
        categories: categories,
      });
    });
  })
});

router.get("/receipts/page/:categoryId", (req, res) => {
  var page = req.params.categoryId;
  var offset = 0;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 2;
  }

  Receipt.findAll({
    include: [{
      model: Category
    }],
    order: [
      ["id", "DESC"]
    ],
    limit: 2,
    offset: offset,
  }).then((receipts) => {
    var next;
    if (offset + 2 >= receipts.count) {
      next = false;
    } else {
      next = true;
    }

    var result = {
      page: parseInt(page),
      next: next,
      receipts: receipts,
    };

    Category.findAll().then((categories) => {
      res.render("admin/receipts/page", {
        result: result,
        receipts: receipts,
        categories: categories,
      });
    });
  });
});

router.get("/admin/filter/2021", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jan 01 2021"), new Date("Dec 31 2021")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/2022", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jan 01 2022"), new Date("Dec 31 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/2023", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jan 01 2023"), new Date("Dec 31 2023")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});

router.get("/admin/filter/janeiro", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jan 01 2022"), new Date("Jan 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/fevereiro", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Feb 01 2022"), new Date("Feb 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/marco", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Mar 01 2022"), new Date("Mar 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/abril", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Apr 01 2022"), new Date("Apr 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/maio", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("May 01 2022"), new Date("May 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/junho", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jun 01 2022"), new Date("Jun 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/julho", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Jul 01 2022"), new Date("Jul 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/agosto", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Aug 01 2022"), new Date("Aug 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/setembro", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Sep 01 2022"), new Date("Sep 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/outubro", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Oct 01 2022"), new Date("Oct 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/novembro", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Nov 01 2022"), new Date("Nov 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});
router.get("/admin/filter/dezembro", adminAuth, async (req, res, next) => {

  var totalReceipts1 = 0;
  var totalReceipts2 = 0;
  var totalReceipts3 = 0;
  var totalReceipts4 = 0;
  var totalReceipts5 = 0;
  var totalReceipts6 = 0;
  var totalReceipts7 = 0;
  var totalReceipts8 = 0;
  var totalReceipts9 = 0;
  var totalReceipts10 = 0;
  var totalReceipts11 = 0;
  var totalReceipts12 = 0;
  var totalReceipts13 = 0;
  var totalReceipts14 = 0;

  var amount1 = await Receipt.findOne({
    where: {
      categoryId: 1,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts1 = amount1['sum(`valor`)']

  var amount2 = await Receipt.findOne({
    where: {
      categoryId: 2,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });

  var totalReceipts3 = amount2['sum(`valor`)']
  var amount3 = await Receipt.findOne({
    where: {
      categoryId: 3,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts3 = amount3['sum(`valor`)']

  var amount4 = await Receipt.findOne({
    where: {
      categoryId: 4,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts2 = amount4['sum(`valor`)']


  var amount5 = await Receipt.findOne({
    where: {
      categoryId: 5,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts5 = amount5['sum(`valor`)']

  var amount6 = await Receipt.findOne({
    where: {
      categoryId: 6,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts6 = amount6['sum(`valor`)']



  var amount7 = await Receipt.findOne({
    where: {
      categoryId: 7,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts7 = amount7['sum(`valor`)']


  var amount8 = await Receipt.findOne({
    where: {
      categoryId: 8,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts8 = amount8['sum(`valor`)']



  var amount9 = await Receipt.findOne({
    where: {
      categoryId: 9,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts9 = amount9['sum(`valor`)']

  var amount10 = await Receipt.findOne({
    where: {
      categoryId: 10,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts10 = amount10['sum(`valor`)']


  var amount11 = await Receipt.findOne({
    where: {
      categoryId: 11,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts11 = amount11['sum(`valor`)']


  var amount12 = await Receipt.findOne({
    where: {
      categoryId: 12,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts12 = amount12['sum(`valor`)']



  var amount13 = await Receipt.findOne({
    where: {
      categoryId: 13,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts13 = amount13['sum(`valor`)']


  var amount14 = await Receipt.findOne({
    where: {
      categoryId: 14,
    },
    attributes: [sequelize.fn("sum", sequelize.col("valor"))],
    raw: true
  });
  var totalReceipts14 = amount14['sum(`valor`)']



  Receipt.findAll({
    include: [{
      model: Category,
    }, ],
    order: [
      ["data", "DESC"]
    ],
    limit: 20,
    where: {
      data: {
        [Op.between]: [new Date("Dec 01 2022"), new Date("De 30 2022")],
      },
    },

  }).then((receipts) => {

    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
        totalReceipts1: totalReceipts1,
        totalReceipts2: totalReceipts2,
        totalReceipts3: totalReceipts3,
        totalReceipts4: totalReceipts4,
        totalReceipts5: totalReceipts5,
        totalReceipts6: totalReceipts6,
        totalReceipts7: totalReceipts7,
        totalReceipts8: totalReceipts8,
        totalReceipts9: totalReceipts9,
        totalReceipts10: totalReceipts10,
        totalReceipts11: totalReceipts11,
        totalReceipts12: totalReceipts12,
        totalReceipts13: totalReceipts13,
        totalReceipts14: totalReceipts14,
      });
    });
  })
});


module.exports = router;
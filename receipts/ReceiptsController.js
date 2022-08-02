const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Receipt = require("./Receipt");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/receipts", adminAuth, (req, res) => {
  Receipt.findAll({
    include: [{
      model: Category
    }],
    order: [
      ["id", "DESC"]
    ],
    limit: 2,
  }).then((receipts) => {
    Category.findAll().then((categories) => {
      res.render("admin/receipts/index", {
        receipts: receipts,
        categories: categories,
      });
    });
  });
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

module.exports = router;
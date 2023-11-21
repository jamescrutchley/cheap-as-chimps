const express = require("express");
const router = express.Router();

const itemController = require('../controllers/itemController')
const categoryController = require('../controllers/categoryController')

router.get("/", categoryController.category_list);

router.get("/all-items", itemController.item_list);


router.get("/:id", categoryController.category_detail);


router.get("/items/:id", itemController.item_detail);


module.exports = router;
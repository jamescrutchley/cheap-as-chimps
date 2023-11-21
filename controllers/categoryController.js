const Category = require("../models/Category");
const Item = require('../models/Item')
const asyncHandler = require("express-async-handler");


// 'home'
exports.category_list = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}, "name description").sort({name: 1}).exec();

    res.render("category_list", {
        title: 'Home',
        category_list: categories, 
    })
});

exports.category_detail = asyncHandler(async (req, res, next) => {

    
    const [category, itemsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category: req.params.id }, "name").sort({name: 1}).exec(),
      ]);

      if (category === null) {
        // No results.
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      
      res.render("category_detail", {
        title: "Category Detail",
        category: category,
        category_items: itemsInCategory
      })

});
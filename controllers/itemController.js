const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category").exec();

    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", {
        item: item,
      });

});

exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, "name").sort({name: 1}).exec();

    console.log(allItems);
    
    res.render("item_list", {
        title: "All Items",
        item_list: allItems,
    })
});

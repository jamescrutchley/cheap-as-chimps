const mongoose = require('mongoose')

const Schema = mongoose.Schema;


  //name, description, price, category, stock

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
    return `./items/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
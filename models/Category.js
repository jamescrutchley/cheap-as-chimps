const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
});

CategorySchema.virtual("url").get(function () {
    return `./inventory/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
const mongoose = require("mongoose");

const CategoryModel = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports =
  mongoose.models.Categories || mongoose.model("Categories", CategoryModel);

const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        title: { type: String, require: true },
    },
    { timestamps: true }               // olusturuldugu zaman
)

const Category = mongoose.model("categories", CategorySchema);   // categroies adinda bi yer acilcak CShema daki iskelet yapisinda olcak
module.exports = Category;
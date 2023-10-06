const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

// get all category
router.get("/get-all", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
    }
})

// create
router.post("/add-category", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(400).json(error);
    }
})

// update
router.put("/update-category", async (req, res) => {
    try {
        await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
        res.status(200).json("Item added successfully.");
    } catch (error) {
        console.log(error);
    }
})

// delete
router.delete("/delete-category", async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.body.categoryId });
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
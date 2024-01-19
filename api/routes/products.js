const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

// get all product
router.get("/get-all", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
})

// create
router.post("/add-product", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("Ürün başarıyla eklendi.");
    } catch (error) {
        res.status(500).json(error);
    }
})

// update
router.put("/update-product", async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
        res.status(200).json("Ürün başarıyla güncellendi.");
    } catch (error) {
        console.log(error);
    }
})

// delete
router.delete("/delete-product", async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.productId });
        res.status(200).json("Ürün başarıyla silindi.");
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/prodectModels');
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Stor').then(
    console.log("mongoose wooooork!")
);

app.get("/Api/product/", async (req, res) => {
    try {

        const product = await Product.find();

        res.json(product);


    } catch (e) {
        res.json({ error: e.message});
    }
});

app.get("/Api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.json({ noooo: "noooooo" });
        }
        res.json(product);
    } catch (e) {
        res.json({ error: e.message});
    }
});

app.post("/Api/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (e) {
        res.json({ error: e.message });
    }

});

app.put("/Api/product/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id,req.body);
        if (!product) {
            return res.status(404).json({ messge: `can not find any product with id : ${id}` });
        }
        const UpdateProduct = await Product.findById(id);
        res.status(200).json(UpdateProduct);
    } catch (e) {
        res.json({ error: e.message});
    }

});

app.delete("/Api/product/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ messge: `can not find any product with id : ${id}` });
        }
        
        res.status(200).json({message: "The product has been successfully deleted"});
    } catch (e) {
        res.json({ error: e.message});
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
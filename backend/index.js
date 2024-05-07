const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Product = require('./product_model');

mongoose
    .connect('mongodb://127.0.0.1:27017/main_database')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Failed to connect to database');
    });

app.use(express.json());

app.use(cors());

app.get('/search', (req, res) => {
    Product.find({ productName: { $regex: new RegExp(req.query.name, 'i') } })
        .then((products) => {
            res.json({
                status: 'SUCCESS',
                message: 'Products fetched successfully',
                data: products,
            });
        })
        .catch((error) => {
            console.error('Error searching for product:', error);
            res.status(500).json({
                status: 'FAILED',
                message: error.message,
                data: null,
            });
        });
});

app.post('/register', (req, res) => {
    Product.create(req.body)
        .then((newProduct) => {
            if (newProduct) {
                res.json({
                    status: 'SUCCESS',
                    message: 'New product added',
                    data: newProduct,
                });
            } else {
                res.status(500).json({
                    status: 'FAILED',
                    message: 'Failed to add new product data',
                    data: null,
                });
            }
        })
        .catch((error) => {
            console.error('Error registering product:', error);
            res.status(500).json({
                status: 'FAILED',
                message: error.message,
                data: null,
            });
        });
});

app.get('/products', (req, res) => {
    Product.find()
        .then((products) => {
            res.json({
                status: 'SUCCESS',
                message: 'Products fetched successfully',
                data: products,
            });
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
            res.status(500).json({
                status: 'FAILED',
                message: error.message,
                data: null,
            });
        });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then((product) => {
            if (product) {
                res.json({
                    status: 'SUCCESS',
                    message: 'Product fetched successfully',
                    data: product,
                });
            } else {
                res.status(404).json({
                    status: 'FAILED',
                    message: 'Product not found',
                    data: null,
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching product:', error);
            res.status(500).json({
                status: 'FAILED',
                message: error.message,
                data: null,
            });
        });
});

app.put('/products/:id/edit', (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    Product.findByIdAndUpdate(productId, updatedProductData, { new: true })
        .then((updatedProduct) => {
            if (updatedProduct) {
                res.json({
                    status: 'SUCCESS',
                    message: 'Product updated successfully',
                    data: updatedProduct,
                });
            } else {
                res.status(404).json({
                    status: 'FAILED',
                    message: 'Product not found',
                    data: null,
                });
            }
        })
        .catch((error) => {
            console.error('Error updating product:', error);
            res.status(500).json({
                status: 'FAILED',
                message: error.message,
                data: null,
            });
        });
});

app.listen(3001, function (result) {
    console.log('PROJECT IS FUNCTIONAL')
});

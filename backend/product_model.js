const mongoose = require('mongoose');

const Product = mongoose.model('Product',
    new mongoose.Schema({
        productName: { type: String, required: true },
        SKU: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        supplier: { type: String, required: true },
        reorderLevel: { type: Number, required: true },
        comments: { type: String }
    })
);

module.exports = Product;
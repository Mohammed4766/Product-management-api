const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

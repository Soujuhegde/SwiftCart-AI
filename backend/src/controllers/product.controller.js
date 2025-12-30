const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    res.status(200).json([]);
};

exports.getProductById = async (req, res) => {
    res.status(200).json({ message: 'Product details' });
};

exports.createProduct = async (req, res) => {
    res.status(201).json({ message: 'Product created' });
};

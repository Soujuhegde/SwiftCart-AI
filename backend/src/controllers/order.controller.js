const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    res.status(201).json({ message: 'Order created' });
};

exports.getOrders = async (req, res) => {
    res.status(200).json([]);
};

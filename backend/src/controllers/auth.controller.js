const User = require('../models/User');

exports.register = async (req, res) => {
    res.status(201).json({ message: 'User registered successfully (Stub)' });
};

exports.login = async (req, res) => {
    res.status(200).json({ token: 'jwt_token_stub', user: { id: '1', name: 'User' } });
};

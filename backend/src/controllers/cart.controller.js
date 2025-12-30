exports.getCart = async (req, res) => {
    res.status(200).json({ items: [], total: 0 });
};

exports.addToCart = async (req, res) => {
    res.status(200).json({ message: 'Item added to cart' });
};

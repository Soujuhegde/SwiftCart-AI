exports.getAnalytics = async (req, res) => {
    res.status(200).json({ sales: 0, visitors: 0 });
};

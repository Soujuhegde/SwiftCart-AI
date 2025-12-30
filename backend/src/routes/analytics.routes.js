const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, analyticsController.getAnalytics);

module.exports = router;

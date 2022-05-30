const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

router.use('/products', productsController);
router.use('/sales', salesController);

module.exports = router;
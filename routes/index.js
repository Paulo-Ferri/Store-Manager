const express = require('express');

const router = express.Router();

const productMiddlewares = require('../middlewares/productMiddlewares');
const salesMiddleware = require('../middlewares/salesMiddleware');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', productMiddlewares.checkProductNameAndQuantity,
productsController.createProduct);
router.put('/products/:id', productMiddlewares.checkProductNameAndQuantity,
productsController.modify);
router.delete('/products/:id', productsController.deleteProduct);

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.post('/sales', salesMiddleware.checkProductIdAndQuantity,
salesController.createSale);
router.put('/sales/:id', salesMiddleware.checkProductIdAndQuantity,
salesController.modifySale);
module.exports = router;

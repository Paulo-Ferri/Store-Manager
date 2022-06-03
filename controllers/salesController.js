const express = require('express');
const salesService = require('../services/salesService');
const salesMiddleware = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', async (_req, res) => {
  const { status, message } = await salesService.getAll();
  res.status(status).json(message);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getAll(id);
  if (message === 'Sale not found') return res.status(status).json({ message });
  return res.status(status).json(message);
});

router.post('/', salesMiddleware.checkProductIdAndQuantity, async (req, res) => {
  const sales = req.body;
  const { id, productsAndQuantities } = await salesService.createSale(sales);
  return res.status(201).json({ id, itemsSold: productsAndQuantities });
});

router.put('/:id', salesMiddleware.checkProductIdAndQuantity, async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const { status, message } = await salesService.changeSale(productId, quantity, id);
  return res.status(status).json(message);
});
module.exports = router;

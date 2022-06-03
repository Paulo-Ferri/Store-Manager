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
  if (message.length === 1) return res.status(status).json(...message);
  return res.status(status).json(message);
});

router.post('/', salesMiddleware.checkProductIdAndQuantity, (req, res) => {
  const sales = req.body;
  const itemsSold = [];
  sales.forEach(({ productId, quantity }) => {
    salesService.createSale(productId, quantity);
    itemsSold.push({ productId, quantity });
  });
  return res.status(201).json({
    id: 1,
    itemsSold,
  });
});

router.put('/:id', salesMiddleware.checkProductIdAndQuantity);
module.exports = router;

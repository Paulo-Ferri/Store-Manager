const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const { status, message } = await productsService.getAll();
  res.status(status).json(message);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.getAll(id);
  if (message === 'Product not found') return res.status(status).json({ message });
  return res.status(status).json(...message);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const { message, status, productRegistred } = await productsService.createProduct(name, quantity);
  if (productRegistred) return res.status(status).json(productRegistred);
  return res.status(status).json({ message });
});

module.exports = router;

const express = require('express');
const productsService = require('../services/productsService');
const productMiddlewares = require('../middlewares/productMiddlewares');

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

router.post('/', productMiddlewares.checkProductNameAndQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const { message, status, productRegistred } = await productsService.createProduct(name, quantity);
  if (productRegistred) return res.status(status).json(productRegistred);
  return res.status(status).json({ message });
});

router.put('/:id', productMiddlewares.checkProductNameAndQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, message } = await productsService.changeProduct(name, quantity, id);
  if (message === 'Product not found') return res.status(status).json({ message });
  return res.status(status).json(message);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.deleteProduct(id);
  if (status === 404) return res.status(status).json({ message });
  return res.status(status).send('ok');
});

module.exports = router;

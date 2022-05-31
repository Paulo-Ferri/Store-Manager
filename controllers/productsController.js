const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const [allCharacters] = await productsService.getAll();
  res.status(200).json(allCharacters);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [productById] = await productsService.getAll(id);
  if (!productById.length) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(...productById);
});

module.exports = router;
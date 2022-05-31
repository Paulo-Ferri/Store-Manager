const express = require('express');
const salesService = require('../services/salesService2');

const router = express.Router();

router.get('/', async (_req, res) => {
  const allSales = await salesService.getAll();
  res.status(200).json(allSales);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const salesById = await salesService.getAll(id);
  if (!salesById.length) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(salesById);
});

module.exports = router;

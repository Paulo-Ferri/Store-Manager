const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const { status, message } = await salesService.getAll();
  res.status(status).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getById(id);
  if (message === 'Sale not found') return res.status(status).json({ message });
  console.log('message:', message);
  return res.status(status).json(message);
};

const createSale = async (req, res) => {
  const sales = req.body;
  const { id, productsAndQuantities } = await salesService.createSale(sales);
  return res.status(201).json({ id, itemsSold: productsAndQuantities });
};

const modifySale = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const { status, message } = await salesService.changeSale(productId, quantity, id);
  return res.status(status).json(message);
};
module.exports = {
  getAll,
  getById,
  createSale,
  modifySale,
};

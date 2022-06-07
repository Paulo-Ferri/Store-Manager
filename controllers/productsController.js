const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const { status, message } = await productsService.getAll();
  res.status(status).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.getById(id);
  if (message === 'Product not found') return res.status(status).json({ message });
  return res.status(status).json(...message);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { message, status, productRegistred } = await productsService.createProduct(name, quantity);
  if (productRegistred) return res.status(status).json(productRegistred);
  return res.status(status).json({ message });
};

const modify = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, message } = await productsService.changeProduct(name, quantity, id);
  if (message === 'Product not found') return res.status(status).json({ message });
  return res.status(status).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.deleteProduct(id);
  if (status === 404) return res.status(status).json({ message });
  return res.status(status).send('ok');
};

module.exports = {
  getAll,
  getById,
  createProduct,
  modify,
  deleteProduct,
};

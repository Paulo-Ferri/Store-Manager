const productsModel = require('../models/productsModel');

const getAll = (id = null) => {
  if (id) return productsModel.getById(id);
  return productsModel.getAll();
};

module.exports = {
  getAll,
};
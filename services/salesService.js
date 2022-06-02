const salesModel = require('../models/salesModel');

const getAll = async (id = null) => {
  if (id) {
    const saleById = await salesModel.getById(id);
    if (!saleById.length) {
      return {
        status: 404,
        message: 'Sale not found',
      };
    }
    return {
      status: 200,
      message: saleById,
    };
  }
  const salesById = await salesModel.getAll();
  return {
    status: 200,
    message: salesById,
  };
};

module.exports = {
  getAll,
};

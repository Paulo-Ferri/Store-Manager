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

const createSale = async (sales) => {
  const saleId = await salesModel.getNewSaleId();
  const productsAndQuantities = [];
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.createNewSale(saleId, productId, quantity);
  });
  sales.forEach(({ productId, quantity }) => {
    productsAndQuantities.push({ productId, quantity });
  });
  return {
    id: saleId,
    productsAndQuantities,
  };
};

module.exports = {
  getAll,
  createSale,
};

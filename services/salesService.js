const salesModel = require('../models/salesModel');

const getAll = async (id = null) => {
  if (id) {
    const saleById = await salesModel.getById(id);
    if (!saleById.length) {
      return {
        status: 404,
        response: 'Sale not found',
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

const changeSale = async (productId, quantity, id) => {
  await salesModel.modifyById(productId, quantity, id);
  return {
    status: 200,
    message: {
      saleId: +id,
      itemUpdated: [
        {
          productId, quantity,
        },
      ],
    },
  };
};

module.exports = {
  getAll,
  createSale,
  changeSale,
};

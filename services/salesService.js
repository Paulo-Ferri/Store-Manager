const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return {
    status: 200,
    message: sales,
  };
};

const getById = async (id) => {
  const salesById = await salesModel.getById(id);
  if (!salesById.length) {
    return {
      status: 404,
      message: 'Sale not found',
    };
  }
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
  getById,
};

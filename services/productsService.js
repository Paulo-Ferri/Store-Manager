const productsModel = require('../models/productsModel');

const getAll = (id = null) => {
  if (id) return productsModel.getById(id);
  return productsModel.getAll();
};

const createProduct = async (productName, quantity) => {
    const [productByName] = await productsModel.getByName(productName);
    if (productByName && !productByName.length) {
      return {
        status: 409,
        message: 'Product already exists',
      };
    }
    const id = await productsModel.createProduct(productName, quantity);
    console.log(id);
    return {
      status: 201,
        productRegistred: {
          id,
          name: productName,
          quantity,
      },
    };
};

module.exports = {
  getAll,
  createProduct,
};

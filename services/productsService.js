const productsModel = require('../models/productsModel');

const getAll = async (id = null) => {
  if (id) {
    const [productById] = await productsModel.getById(id);
    if (!productById.length) {
      return {
        status: 404,
        message: 'Product not found',
      };
    }
    return {
      status: 200,
      message: productById,
    };
  }
  const [allProducts] = await productsModel.getAll();
  return {
    status: 200,
    message: allProducts,
  };
};

const createProduct = async (productName, quantity) => {
    const [productByName] = await productsModel.getByName(productName);
    if (productByName) {
      return {
        status: 409,
        message: 'Product already exists',
      };
    }
    const id = await productsModel.createProduct(productName, quantity);
    return {
      status: 201,
        productRegistred: {
          id,
          name: productName,
          quantity,
      },
    };
};

const changeProduct = async (productName, quantity, id) => {
  const [productById] = await productsModel.getById(id);
  if (!productById.length) {
    return {
      status: 404,
      message: 'Product not found',
    };
  }
  await productsModel.modifyById(productName, quantity, id);
  return {
    status: 200,
    message: {
      id,
      name: productName,
      quantity,
    },
  };
};

module.exports = {
  getAll,
  createProduct,
  changeProduct,
};

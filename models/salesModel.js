const connection = require('../db');

const serialize = (saleProduct) => 
  saleProduct.map((sale) => ({
    saleId: sale.id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

const serializeById = (saleToSerialize) => 
  saleToSerialize.map((sale) => ({
    date: sale.date,
    productId: sale.id,
    quantity: sale.quantity,
  }));

const getAll = async () => {
  const query = `SELECT s.id, s.date, sp.product_id, sp.quantity FROM sales as s
  JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id`;
  const [allSales] = await connection.execute(query);
  return serialize(allSales);
};

const getById = async (id) => {
  const query = `SELECT p.id, s.date, sp.quantity FROM StoreManager.sales_products as sp
  JOIN StoreManager.sales as s
  ON s.id = sp.sale_id
  JOIN StoreManager.products as p
  ON p.id = sp.product_id
  WHERE sp.sale_id = ?`;
  const [salesById] = await connection.execute(query, [id]);
  return serializeById(salesById);
};

module.exports = {
  getAll,
  getById,
};

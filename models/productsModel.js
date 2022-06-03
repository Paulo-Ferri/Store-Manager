const connection = require('../db');

const getAll = () => connection.execute('SELECT * FROM StoreManager.products');

const getById = (id) => connection
.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

const getByName = async (productName) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [results] = await connection.execute(query, [productName]);
  return results;
};

const createProduct = async (productName, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [{ insertId }] = await connection.execute(query, [productName, quantity]);
  return insertId;
};

const modifyById = async (productName, quantity, id) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?`;
  await connection.execute(query, [productName, quantity, id]);
};

const deleteById = async (id) => {
  const query = `DELETE FROM StoreManager.products
  WHERE id = ?`;
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
  modifyById,
  deleteById,
};

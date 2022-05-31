
const getAll = (id = null) => {
  if (id) return salesModel.getById(id);
  return salesModel.getAll();
};

module.exports = {
  getAll,
};

const express = require('express');
const productModel = require('../models/productModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  const [allCharacters] = await productModel.getAll();
  res.status(200).json(allCharacters);
});

module.exports = router;
const express = require('express');
const connection = require('../db');

const router = express.Router();

router.get('/', async (_req, res) => {
  const [allSales] = await connection.execute('SELECT * FROM sales');
  res.status(200).json(allSales);
});

module.exports = router;
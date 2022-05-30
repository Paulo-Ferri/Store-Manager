const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send('products');
});

module.exports = router;
const express = require('express');

const router = express.Router();

// Rota principal: localhost:3000
router.get('/', (req, res) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.1',
  });
});

module.exports = router;

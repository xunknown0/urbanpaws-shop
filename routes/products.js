const express = require('express');
const router = express.Router();

/* GET products index /products */
router.get('/', (req, res, next) => {
  res.send('/products');
});

/* GET products NEW /products */
router.get('/new', (req, res, next) => {
  res.send('NEW /products/new');
});

/* POST products CREATE /products */
router.post('/', (req, res, next) => {
  res.send('CREATE /products');
});

/* GET products SHOW /products/:id */
router.get('/:id', (req, res, next) => {
  res.send('SHOW /products');
});

/* GET products EDIT /product/:id/edit */
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /products');
});

/* PUT products UPDATE /products/id */
router.put('/:id', (req, res, next) => {
  res.send('UPDATE /products/id');
});

/* DELETE products DELETE /products/id */
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /products/:id');
});


module.exports = router;

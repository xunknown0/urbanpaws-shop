const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler'); 
const {
  getAllProducts, 
  newPostProducts, 
  createProducts, 
  showProducts } = require ('../controllers/productCrontroller');
/* GET products index */
router.get('/', errorHandler(getAllProducts));

/* GET new product form */
router.get('/new', errorHandler(newPostProducts));

/* POST products CREATE /products */
router.post('/', errorHandler(createProducts));

/* GET products SHOW /products/:id */
router.get('/:id', errorHandler (showProducts));

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

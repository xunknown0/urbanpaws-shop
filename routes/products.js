const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/errorHandler'); 
const {
  productIndex, 
  productNewPost, 
  productCreate, 
  productShow,
  productEdit,
  productUpdate,
  productDestroy } = require ('../controllers/productCrontroller');
/* GET products index */
router.get('/', asyncErrorHandler(productIndex));

/* GET new product form */
router.get('/new', asyncErrorHandler(productNewPost));

/* POST products CREATE /products */
router.post('/', asyncErrorHandler(productCreate));

/* GET products SHOW /products/:id */
router.get('/:id', asyncErrorHandler (productShow));

/* GET products EDIT /product/:id/edit */
router.get('/:id/edit', asyncErrorHandler(productEdit));

/* PUT products UPDATE /products/id */
router.put('/:id', asyncErrorHandler(productUpdate));

/* DELETE products DELETE /products/id */
router.delete('/:id', asyncErrorHandler(productDestroy));


module.exports = router;

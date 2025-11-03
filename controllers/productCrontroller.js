const Product = require('../models/product');
require('../models/review'); // ensure Review model is registered

module.exports = {
  // GET /products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find({});
      res.render('products/index', { products });
    } catch (err) {
      next(err);
    }
  },

  // GET /products/new
  newPostProducts(req, res, next) {
    res.render('products/new');
  },

  // POST /products
  async createProducts(req, res, next) {
    try {
      const product = await Product.create(req.body);
      res.redirect(`/products/${product._id}`);
    } catch (err) {
      next(err);
    }
  },

  // GET /products/:id
  async showProducts(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate('reviews');
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.render('products/show', { product });
    } catch (err) {
      next(err);
    }
  }
};

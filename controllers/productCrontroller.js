const Product = require('../models/product');
require('../models/review'); // ensure Review model is registered

module.exports = {
  // GET /products
  async productIndex(req, res, next) {
    try {
      const products = await Product.find({});
      res.render('products/index', { products });
    } catch (err) {
      next(err);
    }
  },

  // GET /products/new
  productNewPost(req, res, next) {
    res.render('products/new');
  },

  // POST /products
  async productCreate(req, res, next) {
    try {
      const product = await Product.create(req.body);
      res.redirect(`/products/${product._id}`);
    } catch (err) {
      next(err);
    }
  },

  // GET /products/:id
  async productShow(req, res, next) {
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
  },

  // GET /products/:id/edit
  async productEdit(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.render('products/edit', { product });
    } catch (err) {
      next(err);
    }
  },

  // PUT /products/:id
  async productUpdate(req, res, next) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body.product,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        const error = new Error('Product not found');
        error.status = 404;
        throw error;
      }

      res.redirect(`/products/${updatedProduct.id}`);
    } catch (err) {
      next(err);
    }
  },
async productDestroy(req, res, next) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect('/products');
  } catch (err) {
    next(err);
  }
}
};

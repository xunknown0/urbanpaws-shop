const path = require("path");
const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
require("../models/review"); // ensure Review model is registered

module.exports = {
  // GET /products
  async productIndex(req, res, next) {
    try {
      const products = await Product.find({});
      res.render("products/index", { products });
    } catch (err) {
      next(err);
    }
  },

  // GET /products/new
  productNewPost(req, res, next) {
    res.render("products/new");
  },

async productCreate(req, res, next) {
    try {
      console.log("FILES RECEIVED:", req.files);

      if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded");
      }

      // Upload function for a single file
      const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
          if (file.path) {
            cloudinary.uploader.upload(path.resolve(file.path), (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          } else if (file.buffer) {
            const stream = cloudinary.uploader.upload_stream((err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
            stream.end(file.buffer);
          } else {
            reject(new Error("File has no path or buffer"));
          }
        });
      };

      // Upload all files
      const uploadResults = await Promise.all(req.files.map(uploadToCloudinary));

      // Map images for MongoDB
      req.body.images = uploadResults.map(img => ({
        url: img.secure_url,
        public_id: img.public_id,
      }));

      // Create product
      const product = await Product.create(req.body);
      res.redirect(`/products/${product._id}`);
    } catch (err) {
      console.error("Upload Error:", err);
      next(err);
    }
  },
  // GET /products/:id
  async productShow(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate("reviews");
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.render("products/show", { product });
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
      res.render("products/edit", { product });
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
        const error = new Error("Product not found");
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
        return res.status(404).send("Product not found");
      }
      res.redirect("/products");
    } catch (err) {
      next(err);
    }
  },
};

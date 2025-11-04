const path = require("path");
const Product = require("../models/product");
const { url } = require("inspector");
const { post } = require("../routes");
const product = require("../models/product");
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

      // Upload function for a single file with resizing
      const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
          const uploadOptions = {
            width: 800,
            height: 600,
            crop: "scale", // maintains aspect ratio
          };

          if (file.path) {
            cloudinary.uploader.upload(
              path.resolve(file.path),
              uploadOptions,
              (err, result) => {
                if (err) return reject(err);
                resolve(result);
              }
            );
          } else if (file.buffer) {
            const stream = cloudinary.uploader.upload_stream(
              uploadOptions,
              (err, result) => {
                if (err) return reject(err);
                resolve(result);
              }
            );
            stream.end(file.buffer);
          } else {
            reject(new Error("File has no path or buffer"));
          }
        });
      };

      // Upload all files
      const uploadResults = await Promise.all(
        req.files.map(uploadToCloudinary)
      );

      // Map images for MongoDB
      req.body.images = uploadResults.map((img) => ({
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
      
      const product = await Product.findById(req.params.id);
      if (!product) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
      }

  
      if (req.body.deleteImages && req.body.deleteImages.length) {
        const deleteImages = Array.isArray(req.body.deleteImages)
          ? req.body.deleteImages
          : [req.body.deleteImages];

        for (const public_id of deleteImages) {
          await cloudinary.uploader.destroy(public_id);
          product.images = product.images.filter(
            (img) => img.public_id !== public_id
          );
        }
      }


      if (req.files && req.files.length > 0) {
        const uploadResults = await Promise.all(
          req.files.map((file) =>
            cloudinary.uploader.upload(file.path, {
              width: 800,
              height: 600,
              crop: "scale",
            })
          )
        );

        const newImages = uploadResults.map((img) => ({
          url: img.secure_url,
          public_id: img.public_id,
        }));

        product.images.push(...newImages);
      }

    
      if (req.body.product) {
        const { title, description, price, location } = req.body.product;
        if (title !== undefined) product.title = title;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (location !== undefined) product.location = location;
      }

      await product.save();

      res.redirect(`/products/${product._id}`);
    } catch (err) {
      next(err);
    }
  },

  async productDestroy(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send("Producr not found");
      }

      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
      await product.deleteOne();

      res.redirect("/products");
    } catch (err) {
      next(err);
    }
  },
};

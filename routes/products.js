const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // or memoryStorage if you want
const { asyncErrorHandler } = require("../middleware/errorHandler");
const {
  productIndex,
  productNewPost,
  productCreate,
  productShow,
  productEdit,
  productUpdate,
  productDestroy,
} = require("../controllers/productCrontroller");
/* GET products index */
router.get("/", asyncErrorHandler(productIndex));

/* GET new product form */
router.get("/new", asyncErrorHandler(productNewPost));

/* POST products CREATE /products */
router.post("/", upload.array("images", 5), asyncErrorHandler(productCreate));

/* GET products SHOW /products/:id */
router.get("/:id", asyncErrorHandler(productShow));

/* GET products EDIT /product/:id/edit */
router.get("/:id/edit", upload.array("images", 5), asyncErrorHandler(productEdit));

/* PUT products UPDATE /products/id */
router.put(
  "/:id",
  upload.array("images", 5), // Multer handles up to 5 images
  asyncErrorHandler(productUpdate)
);
/* DELETE products DELETE /products/id */
router.delete("/:id", asyncErrorHandler(productDestroy));

module.exports = router;

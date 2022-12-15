const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // validate
  if (!name || !category || !sku || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // handle image upload v2
  let fileData = {};
  if (req.file) {
    // save image to cloudinaru
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "cloudinary image",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image upload failed");
    }

    if (req.file) {
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  }

  // create product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

// get all products from DB
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({ user: req.user.id }).sort("-createdAt");

  res.status(200).json(product);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product does not exit
  if (!product) {
    res.status(404);
    throw new Error("Product not found!!!");
  }

  // match product product with user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(product);
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  // if product does not exit
  if (!product) {
    res.status(404);
    throw new Error("User not found!!!");
  }

  // match product product with user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(product);
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;

  const { id } = req.params;

  const product = await Product.findById(id);

  // // if product does not exit
  if (!product) {
    res.status(404);
    throw new Error("User not found!!!");
  }

  // match product product with user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // handle image upload v2
  let fileData = {};
  if (req.file) {
    // save image to cloudinaru
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "cloudinary image",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image upload failed");
    }

    if (req.file) {
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  }

  // update product
  const updateProduct = await Product.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: req.file ? fileData : product.image,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

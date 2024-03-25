const createError = require("../utils/errorHandle");
const productsSchema = require("../models/ProductSchema");

const productController = async (req, res, next) => {
  try {
    const allprod = await productsSchema.find();
    if (!allprod) return next(createError(404, "No Data Found"));
    res.status(200).json({
      message: "Data retrieved successfully",
      count: allprod.length,
      data: allprod,
    });
  } catch (err) {
    next(err);
  }
};

const CreateProductController = async (req, res, next) => {
  try {
    const {
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;
    let error = [];
    let newProduct = await new productsSchema({
      title,
      id,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    }).save();

    res.status(200).json({
      message: "Product Added successfully.",
      data: newProduct,
    });
  } catch (err) {
    next(err);
  }
};


const getProductList = async (req, res, next) => {
  try {
    // let productList = await productsSchema.find().lean();

    // res.render('products/getProductList', { productList });
  } catch (error) {
    console.error("Error fetching product list:", error);
    next(err);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const productDetails = await productsSchema.findById({
      _id: req.params.id,
    });
    res.status(200).json({
      message: "Product fetched successfully.",
      data: productDetails,
    });
  } catch (err) {
    next(err);
  }
};

const importProducts = async (req, res, next) => {
  try {
    const importData = await productsSchema.insertMany(req.body);
    res.status(200).json({
      message: "Products inserted.",
      data: importData,
    });
  } catch (err) {
    next(err);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const searchTerm = req.query
    const productDetails = await productsSchema.find({
      title: searchTerm
    })
    if (!productDetails) {
      return next(createError(404, 'no product found'));

    }
    res.status(200).json({
      message: 'search successful',
      data: productDetails
    });
  }
  catch (err) {
    next(err)
  }
}
const getCategories = async (req, res, next) => {
  try {
    const productDetails = await productsSchema.aggregate([
      {
        "$group": {
          "_id": "$category",
          "product": { "$first": "$$ROOT" }
        }
      },
      { "$replaceRoot": { "newRoot": "$product" } }
    ])
    // if (!productDetails) {
    //   return next(createError(404, 'no product found'));

    // }
    res.status(200).json({
      message: 'search successful',
      data: productDetails
    });

  } catch (error) {
    next(err)
  }
}
module.exports = {
  getSingleProduct,
  productController,
  CreateProductController,
  getCategories,
  getProductList,
  importProducts,
  searchProduct
};

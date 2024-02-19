const createError = require('../utils/errorHandle');
const productsSchema = require('../models/ProductSchema');

const productController = async (req, res, next) => {
  try {
    const allprod = await productsSchema.find();
    if (!allprod) return next(createError(404, 'No Data Found'));
    res.status(200).json({
      message: 'Data retrieved successfully',
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
    // if (!req.body.title) {
    //   error.push({ text: 'product title s required' });
    // }
    // if (error.length > 0) {
    //   res.render('products/productCreate', { error, title: req.body.title });
    // } else {
    //   console.log('pramod');
    // }
    res.status(200).json({
      message: 'Product Added successfully.',
      data: newProduct,
    });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  res.render('products/productCreate');
};

const getProductList = async (req, res, next) => {
  try {
    // let productList = await productsSchema.find().lean();
    // console.log('productList', productList);
    // res.render('products/getProductList', { productList });
  } catch (error) {
    console.error('Error fetching product list:', error);
    next(err);
  }
};
module.exports = {
  productController,
  CreateProductController,
  getProduct,
  getProductList,
};

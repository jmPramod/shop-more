// const createError = require("../utils/errorHandle");
const createError = require("../../utils/errorHandle");
const productsSchema = require("../..//models/ProductSchema");

const productController = async (req, res, next) => {
  try {
    const allprod = await productsSchema.find();
    if (!allprod) return next(createError(404, "No Data Found"));
    res.status(200).json({
      message: "Data retrieved successfully",
      count: allprod.length,
      data: allprod,
      statusCode: 200
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
      statusCode: 200
    });
  } catch (err) {
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
      statusCode: 200
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
      statusCode: 200
    });
  } catch (err) {
    next(err);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const term = req.query.term;
    const productId = req.query.id;

    if (productId) {
      const productDetails = await productsSchema.findById(productId);
      if (!productDetails) {
        return next(createError(404, "Product not found."));
      }
      return res.status(200).json({
        message: `Product with ID ${productId}`,
        data: productDetails,
        statusCode: 200
      });
    }
    else if (!term) {
      return next(createError(404, "Please enter the product to search!"));

    }
    const productDetails = await productsSchema.find({
      $or: [
        { title: new RegExp(term, 'i') },
        { brand: new RegExp(term, 'i') },
        { description: new RegExp(term, 'i') },
        { category: new RegExp(term, 'i') }
      ]
    });
    if (productDetails.length === 0) {
      return next(createError(404, "No Product Found."));
    }


    res.status(200).json({
      message: `Product related to ${term}`,
      data: productDetails,
      statusCode: 200
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

    res.status(200).json({
      message: 'All category fetched.',
      count: productDetails.length,
      data: productDetails,
      statusCode: 200
    });

  } catch (error) {
    next(err)
  }
}

const sortProducts = async (req, res, next) => {
  try {
    const { sortBy, minNmax } = req.query;
    if (!sortBy) {
      return next(createError(404, "Incomplete data to sort. missing either sortBy or minMax "));

    }
    let allProducts = await productsSchema.aggregate([
      { $sort: { [sortBy]: parseInt(minNmax) } }
    ]);

    if (!allProducts) {
      return next(createError(404, "The sortBy product does't exist."));

    }
    res.status(200).json({
      message: `Your ${sortBy} is sorted.`,
      data: allProducts,
    });
  } catch (err) {
    next(err);
  }
}
const filterProducts = async (req, res, next) => {
  try {
    const { minPrice, maxPrice, category, minRating, discountPercentage, brand } = req.query;
    const filter = {};
    if (minPrice && minPrice.length > 0) filter.price = { $gt: parseFloat(minPrice) };
    if (maxPrice && maxPrice.length > 0) {
      filter.price = { ...filter.price, $lt: parseFloat(maxPrice) };
    }
    if (category && category.length > 0) filter.category = { $regex: new RegExp(category, 'i') };
    if (minRating && !isNaN(parseInt(minRating))) filter.rating = { $gte: parseInt(minRating) };
    if (discountPercentage && !isNaN(parseInt(discountPercentage))) filter.discountPercentage = { $gte: parseInt(discountPercentage) };
    if (brand && brand.length > 0) {
      filter.brand = Array.isArray(brand) ? { $in: brand.map(b => new RegExp(b, 'i')) } : { $regex: new RegExp(brand, 'i') };
    }

    const allProducts = await productsSchema.find(filter);
    res.status(200).json({
      message: `Your Filtered list.`,
      data: allProducts,
      statusCode: 200
    });

  } catch (error) {
    next(error)
  }
}

const updateProducts = async (req, res, next) => {
  try {
    const documents = await productsSchema.find({})
    for (const doc of documents) {
      const randomRating = (Math.random() * 5).toFixed(2); // Generate a random rating between 0 and 5
      await productsSchema.updateOne({ _id: doc._id }, { $set: { rating: randomRating } });
    }
    res.send("success");
  } catch (error) {
    console.log("error", error);
  }
}
module.exports = {
  getSingleProduct,
  productController,
  CreateProductController,
  getCategories,
  importProducts,
  searchProduct, sortProducts, filterProducts, updateProducts
};

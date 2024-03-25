const createError = require("../../utils/errorHandle");
const productsSchema = require("../../models/ProductSchema");

const productControllerHB = async (req, res, next) => {
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

const CreateProductHB = async (req, res, next) => {
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

        // }
        res.status(200).json({
            message: "Product Added successfully.",
            data: newProduct,
        });
    } catch (err) {
        next(err);
    }
};


const getProductListHB = async (req, res, next) => {
    try {
        // let productList = await productsSchema.find().lean();

        // res.render('products/getProductList', { productList });
    } catch (error) {
        console.error("Error fetching product list:", error);
        next(err);
    }
};

const getSingleProductHB = async (req, res, next) => {
    try {
        const productDetails = await productsSchema.findById({
            _id: req.params.id,
        });
        // res.status(200).json({
        //     message: "Product fetched successfully.",
        //     data: productDetails,
        // });
    } catch (err) {
        next(err);
    }
};



const searchProductHB = async (req, res, next) => {
    try {
        const searchTerm = req.query
        const productDetails = await productsSchema.find({
            title: searchTerm
        })
        if (!productDetails) {
            return next(createError(404, 'no product found'));

        }
        // res.status(200).json({
        //     message: 'search successful',
        //     data: productDetails
        // });
    }
    catch (err) {
        next(err)
    }
}
const getCategoriesHB = async (req, res, next) => {
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
        // res.status(200).json({
        //     message: 'search successful',
        //     data: productDetails
        // });

    } catch (error) {
        next(err)
    }
}
module.exports = {

    getSingleProductHB,
    productControllerHB,
    CreateProductHB,
    getCategoriesHB,
    getProductListHB,

    searchProductHB
};

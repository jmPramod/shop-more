const createError = require("../../utils/errorHandle");
const productsSchema = require("../../models/ProductSchema");



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
        // res.status(200).json({
        //     message: "Product Added successfully.",
        //     data: newProduct,
        // });
    } catch (err) {

        req.flash('Error_msg', err);
    }
};


const getProductListHB = async (req, res, next) => {
    try {
        let productList = await productsSchema.find().lean();

        res.render('products/getProductList', { productList, style: "getProductList.css" });
    } catch (error) {

        req.flash('Error_msg', error);
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

        req.flash('Error_msg', err);
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

        req.flash('Error_msg', err);
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


    } catch (error) {

        req.flash('Error_msg', error);
    }
}
const getCreateProductHB = async (req, res, next) => {
    try {

        res.render('products/productCreate', { style: "createProduct.css" });
    }
    catch (err) {

        req.flash('Error_msg', err);
    }
}
const editProductGetHB = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await productsSchema.findById(id).lean()
        res.render('products/productCreate', { mode: 'edit', data: data, style: "createProduct.css" });


    } catch (error) {

        req.flash('Error_msg', error);
    }


}
module.exports = {

    getSingleProductHB,
    CreateProductHB,
    getCategoriesHB,
    getProductListHB,
    getCreateProductHB,
    searchProductHB,
    editProductGetHB
};

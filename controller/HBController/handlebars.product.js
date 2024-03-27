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


        // let productList = await productsSchema.find().lean();

        // res.render('products/getProductList', { productList, style: "getProductList.css" });

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
    }
    catch (err) {

        req.flash('Error_msg', err);
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
const editProductPostHB = async (req, res, next) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        // const updateData = await productsSchema.findByIdAndUpdate(id, req.body, { new: true })
        // console.log("updateData", updateData);
        // let productList = await productsSchema.find().lean();

        // res.render('products/getProductList', { productList, style: "getProductList.css" });

    } catch (error) {
        next(error)
    }

}
module.exports = {

    getSingleProductHB,
    CreateProductHB,
    getProductListHB,
    getCreateProductHB,
    searchProductHB,
    editProductGetHB,
    editProductPostHB
};

const createError = require("../../utils/errorHandle");
const productsSchema = require("../../models/ProductSchema");

const cloudinaryImage = require("../../utils/cloudinary");


const CreateProductHB = async (req, res, next) => {
    try {
        if (req.user_info.id === "668df0fcf7c96d0b6992fe2b") {

            res.render('products/productCreate');
            return req.flash('Error_msg', "Demo account can't Create the project.");


        }
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
        // let newProduct = await new productsSchema({
        //     title,
        //     id,
        //     description,
        //     price,
        //     discountPercentage,
        //     rating,
        //     stock,
        //     brand,
        //     category,
        //     thumbnail,
        //     images,
        // }).save();


        // let productList = await productsSchema.find().lean();

        res.render('products/getProductList', { newProduct, style: "getProductList.css" });

    } catch (err) {

        req.flash('Error_msg', err);
    }
};


const getProductListHB = async (req, res, next) => {
    try {
        if (req.body.filter) {
            let productList = await productsSchema.find({
                $or: [{ title: { $regex: req.body.filter, $options: "i" } }

                    // , { price: parseFloat(req.bo dy.filter) }

                ]
            }).lean();
            if (productList.length === 0) {
                productList = [{
                    title: 'Product not Found',

                }]

            }
            res.render('products/getProductList', { productList, style: "getProductList.css", listProduct: true, filterValue: req.body.filter });


        }
        else {

            let productList = await productsSchema.find().lean();

            res.render('products/getProductList', { productList, style: "getProductList.css", listProduct: true });
        }
    } catch (error) {
        console.log("error", error);
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
        console.log("data", data);
        res.render('products/productCreate', { mode: 'edit', data: data, style: "createProduct.css" });


    } catch (error) {

        req.flash('Error_msg', error);
    }


}

const editProductPostHB = async (req, res, next) => {

    try {

        if (req.user_info.id === "668df0fcf7c96d0b6992fe2b") {

            req.flash('Error_msg', "Demo account can't Update the project.");
            // return res.render('products/productCreate');
            return res.redirect(`/edit-product/${req.params.id}`)


        }
        const { id } = req.params;
        const data = await productsSchema.findById(id)


        let existingImages = data.images || []; // Get existing images or initialize as empty array


        console.log("req.body.deleteImage", req.body.deleteImage);


        // Check if there are images to delete
        if (req.body.deleteImage) {
            let imagesToDelete = Array.isArray(req.body.deleteImage) ? req.body.deleteImage : [req.body.deleteImage];

            // Loop through images to delete
            for (let publicId of imagesToDelete) {
                // Example of deleting image from Cloudinary
                console.log("publicId", publicId)
                let res = await cloudinaryImage.uploader.destroy(publicId);
                console.log("res", res)
                // Remove the image from the images array in the database
                existingImages = data.images.filter(image => image.productPublicId !== publicId);


            }
        }

        let found = false;
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i].fieldname === 'thumbnailImg') {

                    const urlPath = req.files[i].path
                    const q = urlPath.split(".")[2].split("/")
                    const PublicID = q[q.length - 2].concat("/", q[q.length - 1])
                    req.body.thumbnail = req.body.thumbnail || {};
                    req.body.thumbnail.imageUrl = urlPath
                    req.body.thumbnail.imgPublicId = PublicID
                    if (data.thumbnail.imgPublicId) {
                        await cloudinaryImage.uploader.destroy(data.thumbnail.imgPublicId, (error, result) => {
                            if (error) {
                                console.error('Error deleting thumbnail image:', error);
                            } else {
                                console.log('Deleted thumbnail image:', result);
                            }
                        });
                    }
                }

                else {
                    const urlPath = req.files[i].path
                    const q = urlPath.split(".")[2].split("/")
                    const PublicID = q[q.length - 2].concat("/", q[q.length - 1])

                    existingImages.push({
                        productUrl: urlPath,
                        productPublicId: PublicID
                    });
                }

            }
        }

        // if (req.files && req.files.length > 0) {
        //     // console.log("file123", req.files);

        //     for (let file of req.files) {
        //         if (file.fieldname != "thumbnailImg") {

        //             // Upload image to Cloudinary
        //             const result = await cloudinaryImage.uploader.upload(file.path);

        //             // Push uploaded image details to images array
        //             existingImages.push({
        //                 productUrl: result.secure_url,
        //                 productPublicId: result.public_id
        //             });
        //         }

        //     }
        // }

        req.body.images = existingImages;


        // console.log("req.body.img", req.body);
        const updateData = await productsSchema.findByIdAndUpdate(id, req.body, { new: true });

        let productList = await productsSchema.find().lean();
        res.render('products/getProductList', { productList, style: "getProductList.css", listProduct: true });

    } catch (error) {
        next(error);
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

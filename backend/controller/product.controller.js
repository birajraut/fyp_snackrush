
const { listProductService, restaurantProductListService } = require('../service/product.service')
const { uploadCloudinary } = require('../config/cloudinary')


const Product = require('../models/Product');

const createProduct = async (req, res, next) => {
    try {

        // console.log(req.body,'product create request body')
        const { name, description, foodtype, price, restaurant_id } = req.body;
        const image = req.file ? req.file.buffer : ''; // Assuming image is uploaded using multer
        let logoUrl = ''

        // Validate required fields
        if (!name || !price || !restaurant_id) {
            return res.status(400).json({ message: 'Name, price, and restaurant_id are required' });
        }
        if (image) {
            const uploadCloud = await uploadCloudinary(image)
            logoUrl = uploadCloud?.url
        }

        // Create the product
        const newProduct = new Product({
            name,
            description,
            foodtype,
            price,
            restaurant_id,
            image: logoUrl
        });

        await newProduct.save();

        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    console.log(req.body, 'product update request body')
    try {
        const { id } = req.params;
        const { name, description, foodtype, price } = req.body;
        const image = req.file ? req.file.buffer : ''; // Assuming image is uploaded using multer
        const updateData = {name, description, foodtype, price}
        if (image) {
            const uploadCloud = await uploadCloudinary(image)
            updateData.image = uploadCloud?.url
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            // { name, description, price,  foodtype,    
            //     image: logoUrl
            // },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        next(error);
    }
};  


const listProductController = async (req, res, next) => {
    try {

        const { restaurantId } = req.params
        const resp = await listProductService(restaurantId)
        res.json({
            result: resp,
            message: 'data featched'
        })

    } catch (error) {
        next(error)
    }
}


const restaurantProductList = async (req, res, next)=>{
    try {
        const {restaurant_id} = req.body
        const response = await restaurantProductListService(restaurant_id)
        res.json({
            result: response
        })

    } catch (error) {
        next(error)
    }

}

module.exports = { listProductController,updateProduct, createProduct, restaurantProductList };

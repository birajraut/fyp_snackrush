const { uploadCloudinary } = require("../config/cloudinary");
const { blogDetailsService, blogListService,blogCreateService, blogUpdateService } = require("../service/blog.service");

const blogDetails = async (req, res, next) => {
    try {
        const id = req.params.id;
        const resp = await blogDetailsService(id);
        res.json({
            result: resp,
            message: 'Blog fetched Successfully'
        });
    } catch (error) {
        next(error);
    }
};
const blogList = async (req, res, next) => {
    try {
        const { status } = req.query;
        const resp = await blogListService(status);
        res.json({
            result: resp,
            message: 'Blogs listed Successfully'
        });
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    // const logo = req.file

    try {
        const data = req.body;
        const image = req.file ? req.file.buffer : ''; 
        // Assuming image is uploaded using multer
        let logoUrl = ''

        if (image) {
            const uploadCloud = await uploadCloudinary(image)
            logoUrl = uploadCloud?.url
        }
        const resp = await blogCreateService({...data, image:logoUrl});
        res.json({
            result: resp,
            message: 'Blog created Successfully'
        });
    } catch (error) {
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const resp = await blogUpdateService(id, data);
        res.json({
            result: resp,
            message: 'Blog updated Successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { blogDetails, blogList, createBlog, updateBlog };

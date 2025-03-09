const { v2 } = require('cloudinary');

v2.config({
    cloud_name: 'dwgrckc4w',
    api_key: '521939292948451',
    api_secret: 'au91tr3pK-B8oo28D53_KW6SDhI',
});

const uploadCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        v2.uploader.upload_stream(
            (error, uploadResult) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    reject(new Error('Error uploading to Cloudinary'));
                } else {
                    resolve(uploadResult);
                }
            }
        ).end(fileBuffer);
    });
};

module.exports = { uploadCloudinary };

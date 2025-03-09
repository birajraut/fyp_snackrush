const multer = require('multer')
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + '/public/images')
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + file.originalname
        cb(null, filename)
    },
})
 
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let ext_parts = file.mimetype.split('/')
        let ext = ext_parts.pop()
        let allowed = [
            'jpg',
            'jpeg',
            'png',
            'webp',
        ]
        if (allowed.includes(ext.toLowerCase())) {
            cb(null, true)
        } else {
            cb(new Error(400, 'Invalid file type'))
        }
    },
})
 
module.exports = upload
 
 
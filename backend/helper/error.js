
const { ZodError } = require('zod');
const serverErr = (err, req, res, next)=>{
    console.log(err)
    if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: err.errors.map(error => ({
                    field: error.path.join('.'),
                    message: error.message
                }))
            });
        }
    
    
        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Server Error'
        });
}

module.exports = {serverErr}
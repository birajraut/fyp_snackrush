const createProduct = async (req, res, next)=>{
    try {
        res.send('jjj')
    } catch (error) {
        next(error)
    }

}


module.exports = {createProduct}
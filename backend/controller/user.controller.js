const { userDetailsService, userOrderDetailsService } = require("../service/user.service")

const userDetails = async (req, res, next) => {
    try {
        const userId = req.auth_user
        const resp = await userDetailsService(userId)
        res.json({
            result: resp,
            message: 'Data featched Successfully'
        })
    } catch (error) {
        next(error)
    }
}

const userOrderDetails = async (req, res, next)=>{
    try {
        const userId = req.auth_user
        const resp = await userOrderDetailsService(userId)
        res.json({
            result: resp,
            message: 'Data featched Successfully'
        })
    } catch (error) {
        next(error)
    }
}


module.exports = { userDetails, userOrderDetails }
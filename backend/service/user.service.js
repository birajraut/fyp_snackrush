const User = require("../models/User")

const userDetailsService = async (id)=>{
    const user = await User.findById(id)
    return user;
}

module.exports = {userDetailsService}
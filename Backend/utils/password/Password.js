const bcrypt = require("bcrypt")


const hashPassword= async(value) => {
    const salt = await bcrypt.genSalt(5);
    const hashed = await bcrypt.hash(value,salt)
    return hashed
}
const isMatchingPassword=async(hashed,value) => {
    return await bcrypt.compare(value,hashed)
}


module.exports= {hashPassword,isMatchingPassword}
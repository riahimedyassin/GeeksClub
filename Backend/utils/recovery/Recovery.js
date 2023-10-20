const bcrypt = require("bcrypt")

class Recovery {
    hashResponse = async (value) =>  {
        const salt = await bcrypt.genSalt(5); 
        return await bcrypt.hash(value,salt)
    }
    isMatching= async(value,hashed) => {
        return await bcrypt.compare(value,hashed)
    }
}

module.exports={Recovery}
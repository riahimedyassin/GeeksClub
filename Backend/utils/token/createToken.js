const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (id) => {
  const token = jwt.sign({id}, SECRET_KEY,{ expiresIn: '3d' });
  return token;
};

module.exports = { createToken };

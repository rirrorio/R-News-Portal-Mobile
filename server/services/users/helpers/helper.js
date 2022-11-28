const bcrypt = require ('bcryptjs')

const hashPassword = (pass) => bcrypt.hashSync(pass,8)
const comparePassword  = (pass, hashedPass)=>bcrypt.compareSync(pass,hashedPass)

const jwt = require ('jsonwebtoken')
const secretKey = process.env.secretKey

const generateToken = (payload)=>jwt.sign(payload,secretKey)
const verifyToken = (token)=>jwt.verify(token,secretKey)

module.exports = { hashPassword, comparePassword, generateToken, verifyToken}

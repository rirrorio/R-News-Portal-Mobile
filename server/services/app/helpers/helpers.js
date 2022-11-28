const bcrypt = require ('bcryptjs')

const hashPassword = (password)=> bcrypt.hashSync(password)
const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password,hashedPassword)


const jwt = require ('jsonwebtoken')
const secretKey=process.env.SECRET_KEY

const createToken = (payload)=>jwt.sign(payload, secretKey, {expiresIn: '1h'})
const verifyToken = (token)=> jwt.verify(token, secretKey)


module.exports ={
    hashPassword,
    comparePassword,
    createToken,
    verifyToken
}
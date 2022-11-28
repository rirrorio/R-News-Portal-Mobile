const { comparePassword, createToken} = require("../helpers/helpers");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
        console.log(req.body);
      const findUser = await User.findOne({ where: {
        email
      } });
      if (!findUser) {
        throw { name: "invalid email/password!" };
      }

      const comparePass = comparePassword(password, findUser.password);
      if (!comparePassword) {
        throw { name: "invalid email/password!" };
      }

      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({access_token,findUser:{
        email : findUser.email,
        role : findUser.role,
        id : findUser.id
      }})
    } catch (error) {
        // console.log(error);
        next(error)
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;
      const userRegister = await User.create({
        email,
        password,
        phoneNumber,
        address,
        role: "admin",
      });
      if (userRegister) {
        res
          .status(201)
          .json({ email: userRegister.email, role: userRegister.role });
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;

const { ObjectId } = require("mongodb");
const { getMongoConnection } = require("../config/connection");
const { hashPassword } = require("../helpers/helper");

class UserController {
  static getUsers(req, res) {
    const db = getMongoConnection();
    db.then((connection) => {
      return connection.collection("users").find().toArray()
    })
      .then((result) => {
        result.forEach((element) => {
          delete element.password;
        });
        // console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
    // users.find( {}, { sort: { points:1 }, fields : { privateKey:0, publicKey:0} },
  //   function(err,data){      
  //     res.send(data);
  //   }
  // ); gabisaaaaaaaaaaaaaaaaaaaaaaaaaaaa jadi passwordnya didelete paksa dulu :( 
  static async findUser(req, res) {
    const db = getMongoConnection();
    const { userId } = req.params;
    db.then((connection) => {
      return connection.collection("users").findOne({ _id: ObjectId(userId) });
    })
      .then((result) => {
        if (!result) throw { name: "not found" };
        delete result.password;
        res.status(200).json(result);
      })
      .catch((err) => {
        if (err.name === "not found")
          res.status(404).json({ message: "user not found" });
        else if (err.name === "BSONTypeError")
          res.status(404).json({ message: "id invalid" });
        else res.status(500).json({ message: "internal server error" });
      });
  }
  static async deleteUser(req, res) {
    const db = getMongoConnection();
    const { userId } = req.params;
    db.then((connection) => {
      return connection.collection("users").deleteOne({
        _id: ObjectId(userId),
      });
    })
      .then((result) => {
        if (result.acknowledged === true)
          res
            .status(200)
            .json({ message: `success delete user with id ${userId}` });
        else throw { name: "not found" };
      })
      .catch((error) => {
        if (error.name === "not found")
          res.status(404).json({ message: "user not found" });
        else if (err.name === "BSONTypeError")
          res.status(404).json({ message: "id invalid" });
        else res.status(500).json({ message: "internal server error" });
      });
  }
  static async addUser(req, res) {
    const db = getMongoConnection();
    const { username, email, password, phoneNumber, address } = req.body;
    // console.log(req.body)
    db.then((connection) => {
      return connection.collection("users").insertOne({
        username,
        email,
        password: hashPassword(password),
        phoneNumber,
        address,
        role: "admin",
      });

    })
      .then((result) => {
        if (!username || !email || !password || !phoneNumber || !address) {
          throw { name: "credentials invalid" };
        }
        else if (result.acknowledged === true)
          res
            .status(201)
            .json({ message: `user with id ${result.insertedId} created` });
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "credentials invalid")
          res
            .status(406)
            .json({ message: "invalid credential(s), check your input" });
        res.status(500).json({ message: "internal server error" });
      });
  }
}

module.exports = UserController;

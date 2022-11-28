const axios = require("axios");
const urlUser = "http://localhost:4001";
const urlApp = "http://localhost:4002";
const Redis = require("ioredis");
const redis = new Redis({
  port: 18959, // Redis port
  host: "redis-18959.c54.ap-northeast-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
});

class Controller {
  static async getUsers(req, res) {
    try {
      const usersCache = await redis.get("users");

      if (usersCache) {
        // await redis.del("users");
        res.status(200).json(JSON.parse(usersCache));
      } else {
        const { data: users } = await axios.get(`${urlUser}/users`);
        await redis.set("users", JSON.stringify(users));
        res.status(201).json(users);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async addUser(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const { data: user } = await axios.post(`${urlUser}/users/register`, {
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      await redis.del("users");
      res.status(201).json(user);
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message);
    }
  }

  static async findUser(req, res) {
    try {
      const { userId } = req.params;
      const { data: user } = await axios.get(`${urlUser}/users/${userId}`);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message);
    }
  }
  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const { data: user } = await axios.delete(`${urlUser}/users/${userId}`);
      res.status(200).json({ message: "delete successfull" });
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message);
    }
  }

  static async getPosts(req, res) {
    try {
      const newsCache = await redis.get("news");
      if (newsCache) {
        res.status(200).json(JSON.parse(newsCache));
      } else {
        const { data: news } = await axios.get(`${urlApp}/posts`);
        await redis.set("news", JSON.stringify(news));
        res.status(200).json(news);
      }
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message);
    }
  }

  static async findPost(req, res) {
    try {

      const { postId } = req.params;
      const findPostCache = await redis.get(`news/${postId}`)
      if(findPostCache){
        // console.log('ada cache', findPostCache);
        res.status(200).json(JSON.parse(findPostCache))
      }else{
        const { data: post } = await axios.get(`${urlApp}/posts/${postId}`)
        // console.log(post);
        if(!post){
          throw("post not found")
        }
        else if(post.mongoUserId){
          delete post.User
          const { data: User } = await axios.get(`${urlUser}/users/${post.mongoUserId}`)
          post.User=User
          post.authorId=User.id
          delete post.User.role
          await redis.set(`news/${postId}`, JSON.stringify(post))
          res.status(200).json(post);
        }else if (post.User){
          await redis.set(`news/${postId}`, JSON.stringify(post))
          res.status(200).json(post);
        }
      }
    } catch (error) {
      // console.log(error);
      res.status(error.response.status).json(error.response.data.message);
    }
  }

  static async addPost(req, res) {
    try {
      const { title, content, imgUrl, categoryId, mongoUserId } = req.body;
      // console.log(req.body);
      const { data: post } = await axios.post(`${urlApp}/post`, {
        title,
        content,
        imgUrl,
        categoryId,
        mongoUserId,
      });
      // 6312e5e933231cf423248260 // buat ngetes
      if(post){
        await redis.del("news")
        res.status(201).json({message:"success adding news"})
      }
      
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message);
    }
  }

  static async editpost(req,res){
    try {
      const {postId} = req.params
      const {data:news} = await axios.put(`${urlApp}/posts/${postId}`,req.body)

      if(news) {
        await redis.del("news")
        res.status(201).json(news)
      }
    } catch (error) {
      // console.log(error);
      res.status(error.response.status).json(error.response.data.message)
    }
  }

  static async getCategories(req,res){
    try {
      const categoriesCache = await redis.get("categories")
      if(categoriesCache){
        res.status(200).json(JSON.parse(categoriesCache))
      }else {
        const {data:categories} = await axios.get(`${urlApp}/categories`)
        await redis.set("categories", JSON.stringify(categories))
        res.status(200).json(categories)
      }
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message)
    }
  }

  static async addCategory(req,res){
    try {
      const {data:categories} = await axios.post(`${urlApp}/categories`, req.body)
      await redis.del("categories")
      res.status(201).json(categories)
    } catch (error) {
      res.status(error.response.status).json(error.response.data.message)
    }
  }
  static async editCategory(req,res){
    try {
      const {categoryId} = req.params
      const {data:categories} = await axios.patch(`${urlApp}/categories/${categoryId}`, req.body)
      await redis.del("categories")
      res.status(201).json(categories)
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data.message)
    }
  }

  static async deleteCategory(req,res){
    try {
      const {categoryId} = req.params
      const {data:categories} = await axios.delete(`${urlApp}/categories/${categoryId}`)
      await redis.del("categories")
      res.status(201).json({message:`Category with id ${categoryId} successully deleted`})
    } catch (error) {
      
    }
  }
}

module.exports = Controller;

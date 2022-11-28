const { ApolloServer, gql } = require("apollo-server");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const axios = require("axios");
const urlUser = process.env.DEPLOY_USER || "http://localhost:4001" 
const urlApp = process.env.DEPLOY_APP|| "http://localhost:4002"
const Redis = require("ioredis");
const redis = new Redis({
  port: 18959, // Redis port
  host: "redis-18959.c54.ap-northeast-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
});

const typeDefs = gql`
  type Posts {
    id: ID
    title: String
    imgUrl: String
    Category: Category
    categoryId: Int
  }
  type Post {
    id: ID
    title: String
    content: String
    imgUrl: String
    Category: Category
    Tags: [Tags]
    User: User
  }
  type Category {
    id: ID
    name: String
  }
  type User {
    id: ID
    email: String
  }
  type Tags {
    id: ID
    name: String
  }
  type DeleteResponse {
    message: String
  }
  type AddProductResponse {
    id: ID
    title: String
    content: String
    imgUrl: String
    categoryId: Int
    mongoUserId: String
  }
  type addCategoryResponse{
    message:String
  }
  type addUserResponse{
    username: String
    email: String
    password : String
    phoneNumber: String
    address: String
  }
  type Query {
    Posts: [Posts]
    Post(postId: ID): Post
    PostByCategory(categoryId: ID): [Post]
    Categories: [Category]
    Users: [User]
    User(userId: ID!): User
  }
  input newPost {
    title: String
    content: String
    imgUrl: String
    categoryId: Int
    mongoUserId: String
  }

  input newCategory{
    name:String
  }

  input newUser{
    username: String
    email: String
    password : String
    phoneNumber: String
    address: String
  }

  type Mutation {
    deletePost(postId: ID!): DeleteResponse
    deleteCategory(categoryId: ID!): DeleteResponse
    deleteUser(userId: ID!): DeleteResponse
    addPost(newPost: newPost!): AddProductResponse
    addCategory(newCategory: newCategory!): addCategoryResponse
    addUser(newUser:newUser!) : addUserResponse
    
  }
`;

const resolvers = {
  Query: {
    Posts: async () => {
      try {
        const newsCache = await redis.get("news");
        if (newsCache) {
          return JSON.parse(newsCache);
        } else {
          const { data: news } = await axios.get(`${urlApp}/posts`);
          await redis.set("news", JSON.stringify(news));
          return news;
        }
      } catch (error) {
        throw error;
      }
    },

    Post: async (_, args) => {
      try {
        const { postId } = args;
        const findPostCache = await redis.get(`news/${postId}`);
        if (findPostCache) {
          // console.log('ada cache', findPostCache);
          return JSON.parse(findPostCache);
        } else {
          const { data: post } = await axios.get(`${urlApp}/posts/${postId}`);
          // console.log(post);
          if (!post) {
            throw "post not found";
          } else if (post.mongoUserId) {
            delete post.User;
            const { data: User } = await axios.get(
              `${urlUser}/users/${post.mongoUserId}`
            );
            post.User = User;
            post.authorId = User.id;
            delete post.User.role;
            await redis.set(`news/${postId}`, JSON.stringify(post));
            return post;
          } else if (post.User) {
            await redis.set(`news/${postId}`, JSON.stringify(post));
            return post;
          }
        }
      } catch (error) {
        throw error;
      }
    },

    PostByCategory: async (_, args) => {
      const { categoryId } = args;
      // console.log(args);
      try {
        const { data: news } = await axios.get(
          `${urlApp}/posts?categoryId=${categoryId}`
        )
        return news;
      } catch (error) {
        throw error;
      }
    },
    Categories: async () => {
      try {
        const { data: categories } = await axios.get(`${urlApp}/categories`);
        return categories;
      } catch (error) {
        throw error;
      }
    },

    Users: async () => {
      try {
        const usersCache = await redis.get("users");
        if (usersCache) {
          // await redis.del("users");
          return JSON.parse(usersCache);
        } else {
          const { data: users } = await axios.get(`${urlUser}/users`);
          // console.log(users);
          await redis.set("users", JSON.stringify(users));
          return users;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    User: async (_, args) => {
      try {
        const { userId } = args;
        // console.log(args);
        const { data: user } = await axios.get(`${urlUser}/users/${userId}`);
        // console.log(user);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    deletePost: async (_, args) => {
      try {
        const { postId } = args;
        const { data: post } = await axios.delete(`${urlApp}/posts/${postId}`);
        return 'success delete post';
      } catch (error) {
        throw error;
      }
    },
    deleteCategory: async (_, args) => {
      try {
        const { categoryId } = args;
        const { data: category } = await axios.delete(
          `${urlApp}/categories/${categoryId}`
        )
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { userId } = args;
        const { data: user } = await axios.delete(`${urlUser}/users/${userId}`);
        return { message: "delete successfull" };
      } catch (error) {
        throw error;
      }
    },

    addPost: async (_, args) => {
      try {
        const { title, content, imgUrl, categoryId, mongoUserId } = args.newPost;
        // console.log(req.body);
        const { data: post } = await axios.post(`${urlApp}/post`, {
          title,
          content,
          imgUrl,
          categoryId,
          mongoUserId,
        });
        // 6312e5e933231cf423248260 // buat ngetes
        if (post) {
          await redis.del("news");
          return post
        }
      } catch (error) {
        throw error
      }
    },

    addCategory:async (_,args)=>{
      try {
        const {name}= args.newCategory
        const {data:categories} = await axios.post(`${urlApp}/categories`,{name})
        await redis.del("categories")
        return(categories)
      } catch (error) {
        throw error
      }
    },

    addUser: async (_,args)=>{
      try {
        const { username, email, password, phoneNumber, address } = args.newUser;
        const { data: user } = await axios.post(`${urlUser}/users/register`, {
          username,
          email,
          password,
          phoneNumber,
          address,
        });
        await redis.del("users");
        return user
      } catch (error) {
        throw error
      }
    }
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

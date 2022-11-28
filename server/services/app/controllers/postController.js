const { Op } = require("sequelize");
const { User, Post, Tag, Category, sequelize } = require("../models");

class PostController {
  static async getPost(req, res, next) {
    try {
      const parameter = {
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
          {
            model: Tag,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
        order:[['id', 'ASC']]
       
      };

      if (req.query.categoryId) {
        parameter.where = {
          categoryId: req.query.categoryId,
        };
      }
      if (req.query.search) {
        parameter.where = {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }

      const allPost = await Post.findAll(parameter);

      if (allPost) res.status(200).json(allPost);
    } catch (error) {
      next(error);
    }
  }
  static async getOnePost(req, res, next) {
    try {
      const { postId } = req.params;
      const onePost = await Post.findByPk(postId, {
        include: [
          {
            model: Tag,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["id","email"],
          },
        ],
      });
      if (onePost) res.status(200).json(onePost);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async createPost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, content, imgUrl, categoryId, mongoUserId } = req.body;
      const newPost = await Post.create(
        {
          title,
          content,
          imgUrl,
          categoryId: +categoryId,
          mongoUserId
        },
        { transaction: t }
      );
      if (newPost) {
        await t.commit();
        res.status(200).json(newPost);
      }
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
  static async updatePost(req, res, next) {
    const t = sequelize.transaction();
    try {
      const { title, content, imgUrl, categoryId } = req.body;
      const { postId } = req.params;

      const updatedPost = await Post.update(
        {
          title,
          content,
          imgUrl,
          categoryId: +categoryId,
        },
        {
          where: {
            id: postId,
          },
        },
        { transaction: t }
      );

      if (updatedPost) {
        await t.commit;
        res.status(200).json({message:"success updating news"});
      }
    } catch (error) {
        await t.rollback()
        nexr(error)
    }
  }
  static async deletePost(req, res, next) {
    try {
        const {postId} = req.params
        // console.log(req.params);
        const removePost = await Post.destroy({
            where:{
                id:postId
            }
        })
        console.log(removePost);
        if(removePost)res.status(200).json({message:"success deleting news"})

    } catch (error) {
        console.log(error);
        next(error)
    }   
  }
}

module.exports = PostController;

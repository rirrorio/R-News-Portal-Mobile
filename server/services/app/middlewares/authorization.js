const { Post, Category } = require("../models");

const categoryAuthorization = async (req, res, next) => {
  try {
    const findCategory = await Category.findOne({
      where: {
        id: req.params.categoryId,
      },
    });

    if (findCategory && req.loggedUser.role === "admin") next();
    else throw { name: "forbidden" };
  } catch (error) {
    next(error);
  }
};
const postAuthorization = async (req, res, next) => {
  try {
    console.log(req.loggedUser);
    const findPost = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (findPost && req.loggedUser.role === "admin") next();
    else throw { name: "forbidden" };
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryAuthorization,
  postAuthorization,
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Post.belongsTo(models.User, {foreignKey: 'authorId'})
      Post.hasMany(models.Tag, {foreignKey:'postId'})
    }
  }
  Post.init({
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title must not empty'
        },
        notNull: {
          msg: 'Title must not empty'
        },
      },
    }, 
    slug: DataTypes.STRING,
    content: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'content must not empty'
        },
        notNull: {
          msg: 'content must not empty'
        },
      },
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image must not empty'
        },
        notNull: {
          msg: 'Image must not empty'
        },
      },
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    mongoUserId:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((instance,options)=>{
    instance.slug = instance.title.split(' ').join('-')
  })
  Post.beforeUpdate((instance,options)=>{
    instance.slug = instance.title.split(' ').join('-')
  })
  return Post;
};
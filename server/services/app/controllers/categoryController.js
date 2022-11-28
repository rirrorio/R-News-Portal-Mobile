const {User, Post, Tag, Category } = require ('../models')


class CategoryController{
        static async getCategories(req,res,next){
            try {
                const allCategories = await Category.findAll()
                if(allCategories){
                    res.status(200).json(allCategories)
                }
            } catch (error) {
                next(error)
            }
        }
        static async createCategories(req,res,next){
            try {
                const {name} = req.body

                const newCategory = await Category.create({name})
                if(newCategory) res.status(201).json({message : `category with the name ${newCategory.name} successfully created`})
            } catch (error) {
                next(error)
            }
        }
        static async deleteCategories(req,res,next){
         try {
            const {categoryId} = req.params
            const deleted = await Category.destroy({where :{
                id : categoryId
            }})
            if(deleted)res.status(201).json({message:`category with id ${categoryId} successfully deleted`})
         } catch (error) {
            next(error)
         }   
        }

        static async editCategory(req,res,next){
            try {
                const {categoryId} = req.params
                const edited = await Category.update(req.body,{where:{
                    id:categoryId}})
                if(edited)res.status(201).json({message:`category with id ${categoryId} successfully edited`})
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
}

module.exports = CategoryController
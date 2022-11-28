const express = require ('express')
const Controller = require('./controller')
const router = express.Router()

router.get('/users', Controller.getUsers )
router.post('/users/register', Controller.addUser)
router.get('/users/:userId', Controller.findUser)
router.delete('/users/:userId', Controller.deleteUser)

router.get('/posts', Controller.getPosts)
router.post('/posts', Controller.addPost)
router.get('/posts/:postId', Controller.findPost)
router.put('/posts/:postId', Controller.editpost)

router.get('/categories', Controller.getCategories)
router.post('/categories', Controller.addCategory)
router.patch('/categories/:categoryId', Controller.editCategory)
router.delete('/categories/:categoryId', Controller.deleteCategory)


module.exports=router
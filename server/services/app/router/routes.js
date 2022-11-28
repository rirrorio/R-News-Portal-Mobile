const CategoryController = require('../controllers/categoryController')
const PostController = require('../controllers/postController')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const { postAuthorization, categoryAuthorization } = require('../middlewares/authorization')

const router = require('express').Router()





// router.post('/admin/register', UserController.register) // gak dipake 
// router.post('/admin/login', UserController.login ) // ga dipake
router.get('/posts', PostController.getPost)
router.get('/categories', CategoryController.getCategories)
router.get('/posts/:postId', PostController.getOnePost)

// router.use(authentication)

router.post('/post', PostController.createPost)
router.post('/categories', CategoryController.createCategories)
router.put('/posts/:postId', PostController.updatePost)
router.delete('/posts/:postId', PostController.deletePost)
router.delete('/categories/:categoryId', CategoryController.deleteCategories)
router.patch('/categories/:categoryId', CategoryController.editCategory)

module.exports = router
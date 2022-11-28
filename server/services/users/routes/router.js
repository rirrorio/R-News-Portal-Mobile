const express = require ('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.get('/users', UserController.getUsers )
router.post('/users/register', UserController.addUser )
router.get('/users/:userId', UserController.findUser)
router.delete('/users/:userId', UserController.deleteUser)

module.exports=router
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller')

// auth
router.post("/register", authController.signUp);


// user database
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)  //update the array of the user
router.patch('/unfollow/:id', userController.unfollow) //update the array of the user

module.exports = router;
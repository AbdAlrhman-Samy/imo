const express = require('express');
const userRouter = express.Router();

const { 
    userPage,
    signup,
    signupPage,
    login,
    loginPage,
    logout,
    toggleAdmin,
    deleteUser
 } = require('../controllers/users');
const requireAdmin = require('../middleware/adminMiddleware');
const requireAuth = require('../middleware/authMiddleware');

userRouter.get('/', userPage)

userRouter.route('/signup')
    .get(signupPage)
    .post(signup);

userRouter.route('/login')
    .get(loginPage)
    .post(login);

userRouter.post('/logout', requireAuth, logout);

userRouter.route('/:id')
    .put([requireAuth, requireAdmin], toggleAdmin)
    .delete([requireAuth, requireAdmin], deleteUser);

module.exports = userRouter;
const express = require('express');
const authRouter = express.Router();

const { 
    signup,
    login,
    toggleAdmin,
    deleteUser
 } = require('../controllers/users');


authRouter.post('/signup', signup);

authRouter.post('/login', login);

authRouter.route('/:id')
    .put(toggleAdmin)
    .delete(deleteUser);

module.exports = authRouter;
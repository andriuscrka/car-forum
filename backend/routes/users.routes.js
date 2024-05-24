const express = require('express');
const userController = require('../controllers/users.controllers');

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/:userId/password', userController.updatePassword);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);

module.exports = router;
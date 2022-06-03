var express = require('express');
var router = express.Router();

const UserController = require('../controllers/users');

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUsers);

router.post('/', UserController.createUsers);

router.delete('/', UserController.deleteAllUsers);

router.delete('/:id', UserController.deleteUsers);

router.patch('/:id', UserController.editUsers);

module.exports = router;

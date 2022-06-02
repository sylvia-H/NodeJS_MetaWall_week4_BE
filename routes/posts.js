var express = require('express');
var router = express.Router();

const PostController = require('../controllers/posts');

router.get('/', PostController.getPosts);

router.post('/', PostController.createPosts);

router.delete('/', PostController.deleteAllPosts);

router.delete('/:id', PostController.deletePosts);

router.patch('/:id', PostController.editPosts);

module.exports = router;

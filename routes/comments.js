var express = require('express');
var router = express.Router();

const CommentController = require('../controllers/comments');

router.get('/', CommentController.getComments);

router.post('/', CommentController.createComments);

router.delete('/', CommentController.deleteAllComments);

router.delete('/:id', CommentController.deleteComments);

router.patch('/:id', CommentController.editComments);

module.exports = router;

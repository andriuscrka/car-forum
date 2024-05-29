const express = require('express');
const commentsController = require('../controllers/comments.controllers');

const router = express.Router();

router.get('/:postId', commentsController.getComments);
router.post('/:postId/add', commentsController.addComment);
router.put('/:postId/:commentId/edit', commentsController.editComment);
router.delete('/:postId/:commentId/delete', commentsController.deleteComment);

module.exports = router;
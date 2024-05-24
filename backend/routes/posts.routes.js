const express = require('express');
const postsController = require('../controllers/posts.controllers');

const router = express.Router();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPost);
router.post('/create', postsController.createPost);
router.put('/:postId/edit', postsController.editPost);
router.delete('/:postId/delete', postsController.deletePost);
router.put('/:postId/like', postsController.toggleLike);

module.exports = router;
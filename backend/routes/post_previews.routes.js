const express = require('express');
const postPreviewsController = require('../controllers/post_previews.controllers');

const router = express.Router();

router.get('/', postPreviewsController.getPostPreviews);
router.get('/:postId', postPreviewsController.getPostPreview);
router.get('/thread/:threadId', postPreviewsController.getPostPreviewsByThread);

module.exports = router;
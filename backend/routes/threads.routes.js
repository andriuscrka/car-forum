const express = require('express');
const thereadsController = require('../controllers/threads.controllers');

const router = express.Router();

router.get('/:threadId', thereadsController.getThread);
router.get('/', thereadsController.getThreads);
router.post('/create', thereadsController.createThread);
router.put('/:threadId/edit', thereadsController.editThread);

module.exports = router;
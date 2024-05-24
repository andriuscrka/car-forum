const express = require('express');
const profileController = require('../controllers/profiles.controllers');

const router = express.Router();

router.get('/:userId', profileController.getProfile);
router.put('/:userId/edit', profileController.editProfile);

module.exports = router;
const express = require('express');
const router = express.Router();
// Importing option controller
const optionsController = require('../controllers/optionsController');

router.get('/:id/delete',optionsController.deleteOpt);
router.get('/:id/add_vote',optionsController.addVote);

module.exports = router;
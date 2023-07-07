const express = require('express');
const router = express.Router();
// Importing Controller
const questionsController = require('../controllers/questionsController');
// Importing body parser for post requests
const bodyParser = require('body-parser');



// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let jsonParser = bodyParser.json();


router.get('/',questionsController.viewAll);
router.post('/create',urlencodedParser,questionsController.createQues);
router.get('/:id/delete',questionsController.deleteQues);
router.get('/:id',questionsController.viewQues);
router.post('/:id/options/create',urlencodedParser,questionsController.addOption);

module.exports = router;
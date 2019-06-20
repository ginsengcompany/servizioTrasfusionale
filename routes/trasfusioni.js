let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let trasfusioniController = require('../controllers/trasfusioniController');

router.get('/trasfusioni',trasfusioniController.getTrasfusioni);
router.post('/postTrasfusioni',trasfusioniController.postTrasfusioni);

module.exports = router;

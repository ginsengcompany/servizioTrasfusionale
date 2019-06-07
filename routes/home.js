let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let homeController = require('../controllers/homeController');

router.get('/',homeController.homePage);

module.exports = router;
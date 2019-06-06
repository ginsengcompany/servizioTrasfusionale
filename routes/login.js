let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let loginController = require('../controllers/loginController');

router.get('/',loginController.loginPage);
router.post('/loginMethod',loginController.loginMethod);

module.exports = router;
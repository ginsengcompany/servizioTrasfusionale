let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let operatoreController = require('../controllers/operatoresController');

router.post('/login',operatoreController.login);
router.get('/me',operatoreController.me);

router.post('/loginTrasfusione',operatoreController.loginTrasfusione);

module.exports = router;
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let rotteController = require('../controllers/rotteController');

router.get('/getPrelievoRotte',rotteController.listaUrl);

module.exports = router;

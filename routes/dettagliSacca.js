let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let dettagliSaccaController = require('../controllers/dettagliSaccaController');

router.get('/',dettagliSaccaController.dettagliSacca);

module.exports = router;

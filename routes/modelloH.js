let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let modelloHController = require('../controllers/modelloHController');

router.post('/controllomodellicompilati', modelloHController.controlloModelli);

module.exports = router;
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let pazienteController = require('../controllers/pazienteController');

router.post('/datiPaziente', pazienteController.datiPaziente);

module.exports = router;
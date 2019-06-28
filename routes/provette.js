let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let provetteController = require('../controllers/provetteController');

router.post('/datiprovetta',provetteController.datiProvetta);
router.post('/prelievoEseguito',provetteController.prelievoEseguito);
module.exports = router;

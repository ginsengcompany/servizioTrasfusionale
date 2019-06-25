let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let repartiController = require('../controllers/repartiController');

router.get('/reparti',repartiController.listaReparti);

module.exports = router;

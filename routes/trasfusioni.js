let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let trasfusioniController = require('../controllers/trasfusioniController');

router.get('/trasfusioni',trasfusioniController.getTrasfusioni);
router.get('/trasfusioniPerReparto',trasfusioniController.listTrasfusioniForReparto);
router.get('/fineTrasfusione',trasfusioniController.fineTrasfusione);

router.post('/updateDopoLaTrasfusione',trasfusioniController.updateDopoLaTrasfusione);
router.post('/postTrasfusioni',trasfusioniController.postTrasfusioni);
router.post('/insertTrasfusione',trasfusioniController.insertTrasfusione);
module.exports = router;

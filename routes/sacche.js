let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let saccheController = require('../controllers/saccheController');

router.post('/datisacca',saccheController.getSacca);
router.post('/datisacche',saccheController.getSacche);

router.get('/dettagli',saccheController.dettagliSacca);
router.get('/',saccheController.nuovaSacca);
module.exports = router;

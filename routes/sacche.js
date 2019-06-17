let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let saccheController = require('../controllers/saccheController');

router.post('/datisacca',saccheController.getSacca);
router.post('/datisacche',saccheController.getSacche);
router.post('/postNuovaSacca',saccheController.postNuovaSacca);
router.post('/postModificaFase',saccheController.postModificaFase);

router.get('/dettagliSacca',saccheController.dettagliSacca);
router.get('/nuovaSacca',saccheController.nuovaSacca);


module.exports = router;

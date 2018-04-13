let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
let saccheController = require('../controllers/saccheController');

router.post('/datisacca',saccheController.getSacca);

module.exports = router;
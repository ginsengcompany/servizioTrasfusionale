let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let seedTok = "proviamo";
let log = require('../utils/logger');


exports.getTrasfusioni = function(req,res){
    res.render('trasfusioniInCorso')
};

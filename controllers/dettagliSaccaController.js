let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let log = require('../utils/logger');
let operatore = require('../models/operatores');

exports.dettagliSacca = function(req,res){
    res.render('dettagliSacca')
};

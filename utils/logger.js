let winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
winston.emitErrs = true;
let logger = new winston.Logger({
    transports: [
        new (require('winston-daily-rotate-file'))({
            level: 'info',
            filename: './log/%DATE%.log',
            handleExceptions: true,
            datePattern: 'DD-MM-YYYY',
            prepend: true,
            timestamp: tsFormat,
        }),
        new winston.transports.Console({
            level: 'info',
            timestamp: tsFormat(),
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message){
        logger.info(message);
    }
};
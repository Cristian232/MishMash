const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'heartbeat.log');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({ filename: logFilePath })
    ]
});

setInterval(() => {
    const message = "Heartbeat - Service is running...";
    //console.log(message);

    // Log the message to both console and file using Winston
    logger.info(message);
}, 5000); // Log a message every 5 seconds

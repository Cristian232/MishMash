const winston = require('winston');

// Configure Winston to log to a file
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'service.log' })
    ]
});

function logEvent(event) {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] ${event}`;

    // Log the event using Winston
    logger.info(logMessage);
}

const winston = require('winston');

// Create a Winston logger configuration
const customTimestampFormat = winston.format((info, opts) => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const millisecond = now.getMilliseconds().toString().padStart(3, '0');

    info.timestamp = `${day}/${month}/${year} ${hour}:${minute}:${second}.${millisecond}`;
    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        customTimestampFormat(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp}  ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'service-lifecycle.log' })
    ]
});

logger.info('This is an info message');
logger.error('This is a error message');

module.exports = logger;

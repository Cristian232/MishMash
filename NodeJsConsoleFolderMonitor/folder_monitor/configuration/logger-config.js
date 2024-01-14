const winston = require('winston');

// Create a Winston logger configuration
const customTimestampFormat = winston.format((info, opts) => {
    const now = new Date();

    // Format the date and time components as required
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    // Construct the timestamp in the desired format
    const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;

    info.timestamp = timestamp;

    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        customTimestampFormat(),
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp}  ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'E:\\MishMash\\NodeJsConsoleFolderMonitor\\folder_monitor\\service-lifecycle.log'})
    ]
});

logger.info("This is a info")

module.exports = logger;

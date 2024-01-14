const fs = require('fs');
const logger = require('./logger-config');

function readXmlFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            logger.error(`Error reading XML file: ${err.message.split('\n')[0]}`);
            callback(null); // Return null when there is an error reading the file
        } else {
            logger.info(`Read XML content and returned to parser successful`)
            callback(data); // Return the XML content as a string
        }
    });
}

module.exports = { readXmlFile };

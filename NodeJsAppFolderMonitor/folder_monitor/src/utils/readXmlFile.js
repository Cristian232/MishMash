const fs = require('fs').promises;
const logger = require('../../configuration/logger-config');

async function readXmlFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        logger.info('Read XML content and returned to parser successful');
        return data; // Returning the data read from file
    } catch (err) {
        logger.error(`Error reading XML file: ${err.message.split('\n')[0]}`);
        throw err; // Throwing exception to be caught and handled upstream
    }
}

module.exports = { readXmlFile };
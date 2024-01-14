const fs = require('fs');
const path = require('path');
const logger = require("../logger-config");

// Function to check if a file is of XML type based on its extension
function isXmlFile(filePath) {
    const fileExtension = path.extname(filePath).toLowerCase();
    if (fileExtension === '.xml') {
        logger.info(`XML file detected:      ${filePath}`);
        return true;
    } else {
        logger.warn(`Non-XML file detected:  ${filePath}`);
        return false;
    }
}

module.exports = {
    isXmlFile,
};

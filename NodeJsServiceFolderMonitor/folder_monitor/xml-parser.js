const xml2js = require('xml2js');
const logger = require('./logger-config');
const { readXmlFile } = require('./readXmlFile');

// Function to parse XML content and extract the 'cbc:ID' field
function parseXmlAndReturnIDStringOrFalse(filePath) {
    return new Promise((resolve, reject) => {
        readXmlFile(filePath, (xmlContent) => {
            const parser = new xml2js.Parser({
                explicitArray: false,
                explicitCharkey: true,
                trim: true,
            });

            parser.parseString(xmlContent, (err, result) => {
                if (err) {
                    const errorMessage = `Error parsing XML: ${err.message.split('\n')[0]}`;
                    logger.error(errorMessage);
                    reject(false);
                } else {
                    try {
                        if (result.Invoice && result.Invoice["cbc:ID"]._) {
                            const id = result.Invoice["cbc:ID"]._;
                            if (typeof id === 'string' || id instanceof String) {
                                if (id.length >= 4 && id.length <= 100) {
                                    logger.info(`String Validation passed with ID value: "${id}"`);
                                    resolve(id);
                                } else {
                                    logger.error(`Length of ID is not within the range of 4 to 100 characters`);
                                    reject(false);
                                }
                            } else {
                                logger.error(`Unable to extract 'cbc:ID' as a string`);
                                reject(false);
                            }
                        } else {
                            logger.error(`'result.Invoice' or 'result.Invoice["cbc:ID"]' is not defined in the XML`);
                            reject(false);
                        }
                    } catch (error) {
                        const errorMessage = `Error extracting 'cbc:ID': ${error.message.split('\n')[0]}`;
                        logger.error(errorMessage);
                        reject(false);
                    }
                }
            });
        });
    });
}

module.exports = { parseXmlAndReturnIDStringOrFalse };
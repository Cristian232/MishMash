const logger = require('../configuration/logger-config');
const {readXmlFile} = require('./utils/readXmlFile');
const {logAndReject} = require("./utils/logAndReject");
const {parseXmlContent} = require("./utils/parseXmlContent");
const {getIdFromResult} = require("./utils/getIdFromResult");
const LOG_MSG = 'String Validation passed with ID value:';

async function readAndParseXml(filePath) {
    try {
        const xmlContent = await readXmlFile(filePath);
        const parsedContent = await parseXmlContent(xmlContent);
        return parsedContent;
    } catch (error) {
        logAndReject(error.message);
        throw error;
    }
}

async function logParsedXml(filePath) {
    try {
        const parsedContent = await readAndParseXml(filePath);
        const id = getIdFromResult(parsedContent);
        logger.info(`${LOG_MSG} "${id}"`);
        return id;
    } catch (error) {
        logAndReject(error.message);
        throw error;
    }
}

module.exports = {logParsedXml};
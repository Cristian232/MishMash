const chokidar = require('chokidar');
const logger = require('../configuration/logger-config');
const {logParsedXml} = require("./xml-parser");
const {moveFile} = require("./utils/moveFile");
const {verifyInvoice} = require("./api/submitInvoiceCheckRequest");

const FOLDER_PATH = {
    FAILURE: 'E:\\MishMash\\NodeJsConsoleFolderMonitor\\folder_monitor\\Failure',
    SUCCESS: 'E:\\MishMash\\NodeJsConsoleFolderMonitor\\folder_monitor\\Success',
    MONITOR: 'E:\\MishMash\\NodeJsConsoleFolderMonitor\\folder_monitor\\FolderToBeMonitored'
};

async function moveFileToFailure(path) {
    try {
        await moveFile(path, FOLDER_PATH.FAILURE);
    } catch (error) {
        logger.error(`Error moving file to Failure folder: ${error}`);
    }
}

async function moveFileToSuccess(path) {
    try {
        await moveFile(path, FOLDER_PATH.SUCCESS);
    } catch (error) {
        logger.error(`Error moving file to Success folder: ${error}`);
    }
}

const logFileEvent = event => path => {
    logger.info(`File ${event}: ${path}`);
}

const getVerifiedXMLFile = async path => {
    const result = await logParsedXml(path);
    if (!result) throw new Error('Error parsing XML or invalid ID');
    return result;
};

const getValidatedInvoiceStatus = async (result, path) => {
    const axiosResponse = await verifyInvoice(result, path);
    if (!axiosResponse.exists) throw new Error('Invalid Axios response');
};

const processAddedFile = async (path) => {
    logFileEvent('added')(path);
    try {
        const result = await getVerifiedXMLFile(path);
        await getValidatedInvoiceStatus(result, path);
        await moveFileToSuccess(path);
    } catch (error) {
        logger.error(`Error processing the added file: ${error}`);
        await moveFileToFailure(path);
    }
};

const handleError = error => logger.error(`Watcher error: ${error}`);

const registerFileStatusHandlers = watcher => {
    watcher
        .on('change', logFileEvent('changed'))
        .on('unlink', logFileEvent('removed'))
        .on('error', handleError)
        .on('add', processAddedFile);
};

const initializeFSWatcher = () => {
    const watcher = chokidar.watch(FOLDER_PATH.MONITOR, {
        ignored: /[\/\\]\./,
        persistent: true,
    });
    logger.info(`Watching folder: ${FOLDER_PATH.MONITOR}`);
    registerFileStatusHandlers(watcher);
};

// Finally, call to initialize the file watcher
initializeFSWatcher();
const chokidar = require('chokidar');
const logger = require('./logger-config');
const {parseXmlAndReturnIDStringOrFalse} = require("./xml-parser");
const {moveFile} = require("./moveFile");
const {submitInvoiceCheckRequest} = require("./submitInvoiceCheckRequest");
const checkResponse = require("./checkResponse");

const FAILURE_FOLDER_PATH = 'E:\\MishMash\\NodeJsServiceFolderMonitor\\folder_monitor\\Failure';
const SUCCESS_FOLDER_PATH = 'E:\\MishMash\\NodeJsServiceFolderMonitor\\folder_monitor\\Success';
const MONITOR_FOLDER_PATH = 'E:\\MishMash\\NodeJsServiceFolderMonitor\\folder_monitor\\FolderToBeMonitored';

const watcher = chokidar.watch(MONITOR_FOLDER_PATH, {
    ignored: /[\/\\]\./,
    persistent: true,
});

logger.info(`Watching folder: ${MONITOR_FOLDER_PATH}`);

watcher
    .on('change', (path) => {
    logger.info(`File changed: ${path}`);
    })
    .on('unlink', (path) => {
        logger.info(`File removed: ${path}`);
    })
    .on('error', (error) => {
        logger.info(`Watcher error: ${error}`);
    })
    .on('add', (path) => {
    logger.info(`File added: ${path}`);
    parseXmlAndReturnIDStringOrFalse(path)
        .then((result) => {
            if (result) {
                return submitInvoiceCheckRequest(result ,path);
            } else {
                return Promise.reject('Error parsing XML or invalid ID');
            }
        })
        .then((axiosResponse) => {
            const isValid = axiosResponse.exists; // Call the separate script function
            if (isValid) {
                moveFile(path, SUCCESS_FOLDER_PATH);
            } else {
                moveFile(path, FAILURE_FOLDER_PATH);
            }
        })
        // Handle axios request failure
        .catch((error) => {
            moveFile(path, FAILURE_FOLDER_PATH);
        })
        // Handle XML parsing failure or invalid ID
        .catch((error) => {
            moveFile(path, FAILURE_FOLDER_PATH);
        });
});




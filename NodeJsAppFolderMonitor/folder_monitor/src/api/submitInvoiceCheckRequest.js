const axios = require('axios');
const logger = require('../../configuration/logger-config');
const path = require('path');

const INVOICE_CHECK_URL = 'http://localhost:3000/check-invoice';
const INFO_MSG_TYPE = 'info';
const ERROR_MSG_TYPE = 'error';

function log(id, filePath, messageType, extraMessage = '') {
    const fileName = path.basename(filePath);
    logger[messageType](`ID: ${id} on ${fileName} ${extraMessage}`);
}

async function sendInvoice(id) {
    const requestData = {"id": id};
    return axios.post(INVOICE_CHECK_URL, requestData);
}

async function verifyInvoice(id, invoicePath) {
    try {
        log(id, invoicePath, INFO_MSG_TYPE, `Sending request to server url ${INVOICE_CHECK_URL}`);
        const response = await sendInvoice(id);
        const responseStatusMessage = `Response Status: ${response.status}, Data: ${JSON.stringify(response.data)}`;
        log(id, invoicePath, INFO_MSG_TYPE, responseStatusMessage);
        return response.data;
    } catch (error) {
        const errorMessage = `Server function call failed: ${extractFirstErrorMessage(error)}`;
        log(id, invoicePath, ERROR_MSG_TYPE, errorMessage);
        return null;
    }
}

function extractFirstErrorMessage(error) {
    return error.message.split('\n')[0];
}

module.exports = {verifyInvoice};

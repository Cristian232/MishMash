const axios = require('axios');
const logger = require('./logger-config');
const pathLib = require('path');

const INVOICE_CHECK_URL = 'http://localhost:3000/check-invoice';

// Function to submit invoice to the server for checks
async function submitInvoiceCheckRequest(id, path) {
    try {
        logger.info(`Sending request with id: ${id} to server url ${INVOICE_CHECK_URL} for ${pathLib.basename(path)}`);

        // Define the data to send in the POST request body
        const requestData = { "id":id };

        // Send the POST request using Axios
        const response = await axios.post(INVOICE_CHECK_URL, requestData);

        // Handle the successful response here
        logger.info(`Response Status: ${response.status}, Data: ${JSON.stringify(response.data)}, for ${pathLib.basename(path)}`);

        return response.data;
    } catch (error) {
        // Handle any errors that occurred during the request
        logger.error(`Error calling server function: ${error.message.split('\n')[0]} for id: ${id} on ${pathLib.basename(path)}`);
        return null;
    }
}

module.exports = { submitInvoiceCheckRequest };

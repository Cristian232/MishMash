const {error: logError} = require("../../configuration/logger-config");

function logAndReject(errorMessage, reject) {
    if (typeof reject !== 'function') {
        throw new TypeError("'reject' must be a function");
    }

    logError(errorMessage);
    reject(new Error(errorMessage));
}

module.exports = {logAndReject};
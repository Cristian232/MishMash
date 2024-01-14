const {moveFile} = require("./moveFile");

function handleInvalidXmlOrIdCase(path, FAILURE_FOLDER_PATH) {
    moveFile(path, FAILURE_FOLDER_PATH);
    return Promise.reject('Error parsing XML or invalid ID');
}

module.exports = handleInvalidXmlOrIdCase;
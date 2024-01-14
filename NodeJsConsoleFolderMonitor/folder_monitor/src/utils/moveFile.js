const fs = require('fs');
const path = require('path');
const logger = require("../../configuration/logger-config");

function moveFile(filePath, destinationFolder) {
    const fileName = path.basename(filePath);
    const newFilePath = path.join(destinationFolder, fileName);

    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            logger.error(`Error moving file to ${err.message.split('\n')[0]}`)
        } else {
            logger.info(`File moved to ${destinationFolder}: ${fileName}`);
        }
    });
}

module.exports = {moveFile}
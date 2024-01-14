const {createXmlParser} = require("./createXmlParser");

async function parseXmlContent(xmlContent) {
    return new Promise((resolve, reject) => {
        const parser = createXmlParser();
        parser.parseString(xmlContent, (err, result) => {
            if (err) {
                const errorMessage = `Error parsing XML: ${err.message.split('\n')[0]}`;
                reject(errorMessage);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {parseXmlContent}
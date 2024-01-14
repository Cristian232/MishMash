const xml2js = require("xml2js");

function createXmlParser() {
    return new xml2js.Parser({
        explicitArray: false,
        explicitCharkey: true,
        trim: true,
    });
}

module.exports = {createXmlParser};
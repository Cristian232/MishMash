const {validateId} = require("./validateId");

function getIdFromResult(result) {
    const id = result?.Invoice?.["cbc:ID"]?._;
    if (!id) {
        throw new Error(`'result.Invoice' or 'result.Invoice["cbc:ID"]' is not defined in the XML`);
    }
    if (!validateId(id)) {
        throw new Error(`Length of ID is not within the range of 4 to 100 characters`);
    }
    return id;
}

module.exports = {getIdFromResult}
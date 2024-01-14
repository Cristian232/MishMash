function validateId(id) {
    return typeof id === 'string' && id.length >= 4 && id.length <= 100;
}

module.exports = {validateId};
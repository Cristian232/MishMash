let svc = require('./service-config');
const logger = require("../logger-config");

svc.on('start', function () {
    logger.info('Service started.');
});

svc.start();

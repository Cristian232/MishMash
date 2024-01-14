var svc = require('./service-config');
const logger = require("../logger-config");

svc.on('stop', function () {
    logger.info('Service stopped.');
});

svc.stop();


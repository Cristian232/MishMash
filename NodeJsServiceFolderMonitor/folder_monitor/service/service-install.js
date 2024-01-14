let svc = require('./service-config');
let logger = require('../logger-config');

svc.on('install', function () {
    logger.info('Service installed.');
});

svc.install();

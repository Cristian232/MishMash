let svc = require('./service-config');

svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

svc.uninstall();

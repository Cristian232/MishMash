let Service = require('node-windows').Service;

// Create a new service object
let svc = new Service({
    name: 'Zx_NodeJS_Windows_Service',
    description: 'The Node.js service description',
    script: 'E:\\MishMash\\NodeJsServiceFolderMonitor\\folder_monitor\\heartBeat.js'
});

module.exports = svc;
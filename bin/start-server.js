#!/usr/bin/env node
var path = require('path');
var ide = require('../atropa-server.js');

var port = process.argv[2] || 8888;

var serverRoot = process.argv[3] || path.resolve(__dirname + '/../../');
serverRoot = path.resolve(serverRoot);
console.log('server root: ' + serverRoot);

ide.start(port, serverRoot);
console.log('open http://localhost:' +
    port + ' in your web browser to get started.');



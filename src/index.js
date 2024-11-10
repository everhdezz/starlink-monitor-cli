#!/usr/bin/env node

/* Libraries */
const yargs = require('yargs');
/* Helpers */
const checkOsLibrary = require('./helpers/checkOsLibrary');
/* Actions */
const deviceActions = require('./actions/devices');

require('./managers/configManager').init();
require('./helpers/setupAxios')(require('axios'));

checkOsLibrary('grpcurl');

const options = yargs
    .command('devices:list', 'List all devices', () => {}, deviceActions.list)
    .command('devices:add [deviceToken]', 'Add a new device', () => {}, deviceActions.add)
    .command('devices:remove [deviceIndex]', 'Remove a device', () => {}, deviceActions.remove)
    .command('devices:ping', 'Ping all devices', () => {}, deviceActions.ping)
    .help()
    .argv;
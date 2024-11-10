#!/usr/bin/env node

/* Libraries */
const yargs = require('yargs');
/* Helpers */
const checkOsLibrary = require('./helpers/checkOsLibrary');
/* Actions */
const deviceActions = require('./actions/devices');
const configActions = require('./actions/config');

const { version } = require('../package.json');

require('./managers/configManager').init();
require('./helpers/setupAxios')(require('axios'));

checkOsLibrary('grpcurl');

const options = yargs
    .command('config:api-url [apiUrl]', 'Update the api url', () => {}, configActions.updateApiUrl)
    .command('devices:list', 'List all devices', () => {}, deviceActions.list)
    .command('devices:add [deviceToken]', 'Add a new device', () => {}, deviceActions.add)
    .command('devices:remove [deviceIndex]', 'Remove a device', () => {}, deviceActions.remove)
    .command('devices:ping', 'Ping all devices', () => {}, deviceActions.ping)
    .version(version)
    .help()
    .argv;
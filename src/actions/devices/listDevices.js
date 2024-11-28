"use strict";

/* Libraries */
const clc = require('cli-color');
/* Managers */
const configManager = require('../../managers/configManager');

module.exports = () => {
    const devices = configManager.get('devices');

    if (!Array.isArray(devices) || devices.length === 0) {
        console.log(clc.yellow('No devices found.'));

        process.exit(1);
    }

    devices.map((device, index) => {
        const host = device && device.server && device.server.host ? device.server.host : 'unknown';
        const port = device && device.server && device.server.port ? device.server.port : 'unknown';

        console.log(`${index + 1}) ${host}:${port}`);
    });
}
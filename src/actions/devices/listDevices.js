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
        console.log(`${index + 1}) ${device?.server?.host}:${device?.server?.port}`);
    });
}
"use strict";

/* Libraries */
const clc = require('cli-color');
/* Managers */
const configManager = require('../../managers/configManager');

module.exports = async ({
    deviceIndex,
}) => {
    if (!deviceIndex) {
        console.log(clc.yellow("[Warn] Device index is required"));

        process.exit(1);
    }

    if (!deviceExists(deviceIndex)) {
        console.log(clc.yellow('[Warn] Device does not exist.'));

        process.exit(1);
    }

    removeDevice(deviceIndex);

    process.exit(1);
}

function deviceExists(deviceIndex) {
    const devices = configManager.get('devices');

    return Array.isArray(devices) && devices.length >= deviceIndex;
}

function removeDevice(deviceIndex) {
    const devices = configManager.get('devices');

    devices.splice(deviceIndex - 1, 1);

    configManager.set({
        devices
    });

    console.log(clc.green('Device removed.'));
}
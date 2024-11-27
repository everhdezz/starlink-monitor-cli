"use strict";

/* Libraries */
const clc = require('cli-color');
const axios = require('axios');
/* Managers */
const configManager = require('../../managers/configManager');
/* Helpers */
const getGrpcDeviceInfo = require('../../helpers/getGrpcDeviceInfo');

module.exports = async ({
    deviceToken,
    host = '192.168.100.1',
    port = '9200',
    ignoreGrpc = false,
}) => {
    if (!deviceToken) {
        console.log(clc.yellow("[Warn] Token is required"));

        process.exit(1);
    }

    if (
        !ignoreGrpc && (
            !checkLocalDevice(host, port) ||
            checkIfDeviceIsAlreadyAdded(host, port)
        ) ||
        checkIfTokenIsUsedByAnotherDevice(deviceToken) ||
        !(await checkToken(deviceToken))
    ) {
        process.exit(1);
    }

    addDevice({
        server: !ignoreGrpc ? { host, port } : undefined,
        ignoreGrpc,
        token: deviceToken,
    });

    console.log(clc.green('Device added successfully.'));
    process.exit(1);
}

function checkLocalDevice(host, port) {
    try {
        console.log(`Pinging device ${host}:${port}...`);
        const response = getGrpcDeviceInfo(host, port);

        return true;
    } catch (error) {
        console.log(clc.red(error));

        return false;
    }
}

async function checkToken(deviceToken) {
    try {
        console.log('checking if the token is valid...');
        const response = await axios
            .get(`api/device`, {
                headers: {
                    Authorization: `Bearer ${deviceToken}`,
                },
            });

        return true;
    } catch (error) {
        console.log(clc.red(error));

        return false;
    }
}

function checkIfDeviceIsAlreadyAdded(host, port) {
    console.log(`Checking if device ${host}:${port} is already added...`);
    const devices = configManager.get('devices');

    const deviceAlreadyAdded = devices.some((device) => {
        return device.server.host === host && device.server.port === port;
    });

    if (deviceAlreadyAdded) {
        console.log(clc.yellow('[Warn] Device is already added.'));

        return true;
    }

    return false;
}

function checkIfTokenIsUsedByAnotherDevice(deviceToken) {
    console.log('Checking if the token is already in use by another device...');
    const devices = configManager.get('devices');

    const tokenAlreadyAdded = devices.some((device) => {
        return device.token === deviceToken;
    });

    if (tokenAlreadyAdded) {
        console.log(clc.yellow('[Warn] token is already used by another device.'));

        return true;
    }

    return false;
}

function addDevice(device) {
    if (device?.ignoreGrpc)  {
        console.log(`Adding device wihtout grpc...`);
    } else {
        console.log(`Adding device ${device.server?.host}:${device.server?.port}...`);
    }

    let devices = configManager.get('devices') || [];

    devices.push(device);

    configManager.set({
        devices
    });
}
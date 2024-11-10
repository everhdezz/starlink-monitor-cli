"use strict";

/* Libraries */
const clc = require('cli-color');
const axios = require('axios');
/* Managers */
const configManager = require('../../managers/configManager');
/* Helpers */
const getGrpcDeviceInfo = require('../../helpers/getGrpcDeviceInfo');

module.exports = async ({}) => {
    const devices = configManager.get('devices');

    devices.map(pingDevice);

    process.exit(1);
}

async function pingDevice({ token, server }) {
    try {
        const deviceInfo = getGrpcDeviceInfo(server.host, server.port);

        await axios
            .get(`api/device`, {
                params: { deviceInfo },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    } catch (error) {
        console.log(clc.red(error));
    }
}

function getDeviceInfo() {
    getGrpcDeviceInfo
}
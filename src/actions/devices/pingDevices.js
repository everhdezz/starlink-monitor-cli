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

    console.log(clc.blue(`Pinging ${devices.length} devices...`));

    await Promise.all(
        devices.map(async (device) =>
            await pingDevice(device)
        )
    );

    console.log(clc.blue('Pinging devices completed.'));

    process.exit(1);
}

async function pingDevice({ token, server, ignoreGrpc }) {
    try {
        const host = (server && server.host) || 'unknown';
        const port = (server && server.port) || 'unknown';
        console.log(`Pinging device ${host}:${port}...`);

        const deviceInfo = !ignoreGrpc ? getGrpcDeviceInfo(server.host, server.port) : null;

        return await axios
            .post(`api/device/ping`, deviceInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    } catch (error) {
        console.log(clc.red(error));
    }
}
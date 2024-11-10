"use strict";

/* Libraries */
const clc = require('cli-color');
/* Managers */
const configManager = require('../../managers/configManager');

module.exports = async ({ apiUrl }) => {
    if (!apiUrl) {
        console.log(clc.yellow('[Warn] Please provide an API URL'));
        process.exit(1);
    }

    configManager.set({  apiUrl });

    console.log(clc.green(`API URL updated to ${apiUrl}`));

    process.exit(1);
}
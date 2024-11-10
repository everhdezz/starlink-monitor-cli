/* Libraries */
const fs = require('fs');
const path = require('path');
const os = require('os');
/* Helpers */
const getNestedValue = require('../helpers/getNestedValue');

const userHomeDir = os.homedir();
const configDir = path.join(userHomeDir, '.starlink_monitor');
const configFilePath = path.join(configDir, 'config.json');
const defaultConfigs = {
    apiUrl: 'http://starlink-monitor.test',
    devices: []
};

function init() {
    createConfigDir();
    createDefaultConfigFile();
}

function createConfigDir() {
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }
}

function createDefaultConfigFile() {
    if (!fs.existsSync(configFilePath)) {
        set(defaultConfigs);
    }
}

function loadConfig() {
    if (fs.existsSync(configFilePath)) {
        const configContent = fs.readFileSync(configFilePath, 'utf-8');

        return JSON.parse(configContent);
    }

    return {};
}

function get(value) {
    return getNestedValue(loadConfig(), value);
}

function set(config) {
    fs.writeFileSync(configFilePath, JSON.stringify({
        ...defaultConfigs,
        ...config,
    }, null, 4));
}


module.exports = {
    init,
    loadConfig,
    get,
    set,
};

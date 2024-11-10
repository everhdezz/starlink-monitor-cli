const configManager = require('../managers/configManager');

module.exports = (axios) => {
    axios.defaults.baseURL = configManager.get('apiUrl');
    axios.defaults.headers.Accept = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    axios.defaults.validateStatus = (status) => {
        return status >= 200 && status < 400;
    };
}

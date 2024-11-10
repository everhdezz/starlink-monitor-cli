/* Libraries */
const { execSync } = require('child_process');

module.exports = (host, port) => {
    const response = execSync(`grpcurl -plaintext -d '{"get_status":{}}' ${host}:${port} SpaceX.API.Device.Device/Handle`);

    return JSON.parse(response);
}
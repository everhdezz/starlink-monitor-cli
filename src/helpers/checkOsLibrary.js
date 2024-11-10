/* Libraries */
const { execSync } = require('child_process');
const clc = require('cli-color');

module.exports = (library) => {
    try {
        execSync(`which ${library}`);

        return true;
    } catch (error) {
        console.log(clc.red(`Library ${library} not found.`));

        process.exit(1);
    }
}
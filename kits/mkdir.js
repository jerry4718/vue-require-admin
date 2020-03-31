const fs = require('fs');
const path = require('path');

module.exports = function mkdirSync(dirPath) {
    const parentPath = path.dirname(dirPath);
    if (!fs.existsSync(parentPath)) {
        mkdirSync(parentPath);
    }
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

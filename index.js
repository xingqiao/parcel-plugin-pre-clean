const path = require('path');
const CWD = require('process').cwd();
const globby = require('globby');
const rimraf = require('rimraf');

module.exports = () => {
    let config;
    try {
        config = require(path.resolve(CWD, 'package.json'));
    } catch (e) {
        return;
    }
    let files = config && config['parcelClean'];
    if (files && typeof files === 'string') {
        files = [files];
    } else if (!Array.isArray(files) || !files.length) {
        return;
    }
    globby.sync(files).map(file => {
        file = path.resolve(file);
        if (file !== CWD) {
            rimraf.sync(file);
        }
    });
};

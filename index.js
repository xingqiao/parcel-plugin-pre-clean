const path = require('path');
const CWD = require('process').cwd();
const globby = require('globby');
const rimraf = require('rimraf');
const process = require('process');

function clean(files) {
    if (files && typeof files === 'string') {
        files = [files];
    } else if (!Array.isArray(files) || !files.length) {
        return;
    }
    globby.sync(files, { onlyFiles: false, expandDirectories: false }).map(file => {
        file = path.resolve(file);
        if (file !== CWD) {
            rimraf.sync(file);
        }
    });
}

module.exports = bundler => {
    let config;
    try {
        config = require(path.resolve(CWD, 'package.json'));
    } catch (e) {
        return;
    }
    if (!config) {
        return;
    }
    clean(config.parcelClean);

    // 编译完成后删除
    if (process.env.NODE_ENV === 'production') {
        bundler.on('bundled', () => {
            setTimeout(() => {
                clean(config.parcelBuildClean);
            }, 0);
        });
    }
};

# parcel-plugin-pre-clean

[![NPM Version](https://img.shields.io/npm/v/parcel-plugin-pre-clean.svg?style=flat-square)](https://www.npmjs.com/package/parcel-plugin-pre-clean)
[![NPM Downloads](https://img.shields.io/npm/dm/parcel-plugin-pre-clean.svg?style=flat-square)](https://www.npmjs.com/package/parcel-plugin-pre-clean)

parcel插件，用于在构建前删除指定路径的文件和目录。

基于 [globby](https://github.com/sindresorhus/globby) 和 [rimraf](https://github.com/isaacs/rimraf) 实现，可以指定要删除的文件以及要过滤的部分。

## Install

```bash
$ npm i -D parcel-plugin-pre-clean
```

## How it works

```json
// package.json
{
    "parcelClean": [
        "dist",
        "*.html",
        "*.js",
        "!build.js"
    ],
    "parcelBuildClean": [
        ".cache"
    ]
}
```

在 `parcelClean` 和 `parcelBuildClean` 中配置要删除的文件或目录列表，支持通配符，可以用 `!` 符号来进行文件过滤

- `parcelClean` 在每次编译前触发，可以用来配置删除上一次生成的文件
- `parcelBuildClean` 只在生产环境编译完成后触发，可以用来删除缓存文件或者已经内联的js文件

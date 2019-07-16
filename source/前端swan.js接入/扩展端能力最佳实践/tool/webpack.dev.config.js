/**
 * @file webpack.dev.config.js
 * @description webpack development 配置
 * @author lijia(lijia30@baidu.com)
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const path = require('path');
const pathToRoot = relativePath => path.resolve(__dirname, '..', relativePath);


module.exports = merge(
    baseWebpackConfig,
    {
        entry: {
            src: pathToRoot('src/extension.js')
        },
        output: {
            path: pathToRoot('output'),
            filename: 'extension.dev.js'
        }
    }
)
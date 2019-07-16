/**
 * @file webpack.test.config.js
 * @description webpack 单测配置
 * @author lijia(lijia30@baidu.com)
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const path = require('path');


module.exports = merge(
    baseWebpackConfig,
    {
        mode: 'development',
        entry: {
            src: path.resolve(__dirname, '../src/index.js')
        }
    }
)
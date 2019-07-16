/**
 * @file webpack.prod.config.js
 * @description webpack prodction配置
 * @author lijia(lijia30@baidu.com)
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
            filename: 'extension.js'
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warning: false,
                        compress: {
                            /* eslint-disable fecs-camelcase */
                            drop_console: false
                            /* eslint-disable fecs-camelcase */
                        },
                        comments: false
                    }
                })
            ]
        }
    }
)
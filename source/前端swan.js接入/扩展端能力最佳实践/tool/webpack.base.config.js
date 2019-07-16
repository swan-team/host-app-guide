/**
 * @file webpack.base.config.js
 * @description webpack基础配置
 * @author lijia(lijia30@baidu.com)
 */
const path = require('path');


module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env'],
                plugins: [
                    'transform-class-properties', ['transform-object-rest-spread', {useBuiltIns: true}],
                    'transform-decorators-legacy',
                    'transform-object-assign'
                ]
            }
        },
            {
                parser: {
                    amd: false
                }
            }
        ]
    }
};
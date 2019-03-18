/**
 * @license
 *  Copyright Baidu Inc. All Rights Reserved.
 *
 *  This source code is licensed under the Apache License, Version 2.0; found in the
 *  LICENSE file in the root directory of this source tree.
 *
 * @file demo宿主的配置
 */

/**
 * 宿主配置信息
 *
 * @type {{name: string, appName: string, domains: string[], minSwanJsVersion: string}}
 */
exports.config = {
    name: "demo",     // 宿主名称,展示在宿主切换列表
    appName: "demo",       // 宿主英文名称,要和B端平台对应,拼接useragent使用
    domains: ["https://passport.baidu.com"],        // 可操作cookie权限的域名list
    minSwanJsVersion: "3.0.0",   // 宿主支持swanJs的起始版本   swanNative?
    minSwanNativeVersion: '1.0.0',
    maxSwanNativeVersion: '2.2.99'
};

/**
 * 根据 swanNative 的版本号来获取可以支持的对应 extensionJs 版本区间
 * @param {string} swanNativeVersion 选中的 swanNative 版本号
 * @return {string} semver表达式 支持的 extensionJs 版本区间
 */
exports.getExtensionJsRange = swanNativeVersion => {
    return '^1.0.0';
};

/**
 * 根据extensionJsVersion获取对应的宿主app版本号
 * @param {string} swanJsVersion swanJsVersion
 * @param {string} extensionJsVersion extensionJsVersion
 * @return {string} hostAppVersion hostAppVersion
 */
exports.getHostAppVersion = (swanJsVersion, extensionJsVersion) => {
    return '12.0.0';
};



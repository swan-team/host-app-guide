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
 * 获取宿主 extensionJs 版本区间
 *
 * @param {string} swanJsVersion 当前 swanJs 版本号
 * @param {string} swanNativeVersion 当前 swanNative 版本号
 * @return {string} extensionJs semver表达式，用于更新和选择的筛选
 */
exports.getExtensionJsRange = ({swanJsVersion, swanNativeVersion}) => {
    return '^1.0.0';
};

/**
 * 根据版本信息获取对应的宿主app版本号
 *
 * @param {Object=} versions 版本信息
 * @param {string} versions.swanJsVersion 当前 swanJs 版本号
 * @param {string} versions.swanNativeVersion 当前 swanNative 版本号
 * @param {string} versions.extensionJsVersion 当前 extensionJs 版本号
 * @return {string} hostAppVersion 宿主app版本号
 */
exports.getHostAppVersion = ({swanJsVersion, swanNativeVersion, extensionJsVersion}) => {
    return '12.0.0';
};

/**
 * 非必填，获取宿主自定义设备
 *
 * @return {Object} devices 设备信息
 */
exports.getDevices = () => {
    // isProfiledScreen 是否是异形屏，其余参数和getsystemInfo一致
    return {
        'demo': {
            'model': 'demo',
            'pixelRatio': 2,
            'system': 'android 7.0.1',
            'screenWidth': 400,
            'screenHeight': 800,
            'isProfiledScreen': false
        }
    };
};

/**
 * 非必填，编辑器代码提示和补全数据
 *
 * @return {Object} intellisense 编辑器代码提示信息
 */
exports.getIntellisense = () => ({
    // api代码提示信息
    apiInfo: [
        {
            // 命名空间类型 可选值[object, string]
            'type': 'object',
            // 命名空间名称
            'name': 'swan.demo',
            // 命名空间下api数组
            'members': [
                {
                    // api类型 可选值[function]
                    'type': 'function',
                    // api名称
                    'name': 'demo',
                    // api描述信息
                    'description': '这是一个demo的描述示例',
                    // api参数列表
                    'params': [
                        {
                            // api参数类型 可选值[object，string, boolean]
                            'type': 'object',
                            // api参数名称
                            'name': 'demoOptions',
                            // api参数成员列表
                            'members': [
                                {
                                    // api参数成员名称
                                    'name': 'test',
                                    // api参数成员类型 可选值[string，color-string，function，array，number，boolean]
                                    'type': 'string',
                                    // api参数成员是否必要值
                                    'necessary': false,
                                    // api参数成员描述信息
                                    'detail': '这是demo的test字段'
                                },
                                {'name': 'success', 'type': 'function', 'necessary': false, 'detail': '接口调用成功的回调函数'},
                                {'name': 'fail', 'type': 'function', 'necessary': false, 'detail': '接口调用失败的回调函数'},
                                {
                                    'name': 'complete',
                                    'type': 'function',
                                    'necessary': false,
                                    'detail': '接口调用结束的回调函数（调用成功、失败都会执行）'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    // 组件代码提示信息
    componentsInfo: [
        {
            // 组件名称
            'name': 'demo-video',
            // 组件属性列表
            'params': [
                {
                    // 组件属性名称
                    'name': 'src',
                    // 组件属性类型 可选值[string, boolean]
                    'type': 'string',
                    // 组件属性默认值
                    'default': '',
                    // 组件属性描述信息
                    'detail': '视频地址'
                }
            ]
        }
    ]
});

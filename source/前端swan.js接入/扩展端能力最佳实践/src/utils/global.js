/**
 * @file env
 * @description 获取当前全局环境
 * @author lijia(lijia30@baidu.com)
 */

/* globals swanGlobal, _naSwan */

const isWebviewEnv = typeof swanGlobal === 'undefined';

const global = typeof swanGlobal === 'undefined' ? window : swanGlobal;

const globalNative = typeof swanGlobal === 'undefined' ? window : _naSwan;

export {
    isWebviewEnv,
    global,
    globalNative
};

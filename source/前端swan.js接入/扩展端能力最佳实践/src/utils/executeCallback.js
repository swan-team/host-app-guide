/**
 * @file executeCallback
 * @description 处理端返回，支持开发者回调
 * @author lijia(lijia30@baidu.com)
 */

/**
 * 执行函数并捕获异常
 *
 * @param  {Function} fn     需要执行的函数
 * @param  {string}   errMsg 错误信息
 * @param  {Object}   params 函数执行的参数
 * @return {undefined}       undefined
 */
const executeByTryCatch = (fn, errMsg, params) => {
    try {
        fn && fn(params);
    }
    catch (error) {
        errMsg = error.message + ';' + errMsg;
        console.error(`thirdScriptError\n${errMsg}\n${error.stack}`);
    }
};

/**
 * 执行开发者的 success/fail、complete 回调
 *
 * @param  {Object|Array} options.promise   等待端上结果的 promise 对象
 * @param  {string}       options.apiName   API 名称
 * @param  {Object}       params            开发者的参数
 * @return {undefined}
 */
const executeCallback = ({promise, apiName}, params = {}) => {

    const ERROR_PREFIX = 'at api';
    const ERROR_SUFFIX = 'callback function';
    const ERROR_MSG = {
        success: `${ERROR_PREFIX} ${apiName} success ${ERROR_SUFFIX}`,
        fail: `${ERROR_PREFIX} ${apiName} fail ${ERROR_SUFFIX}`,
        complete: `${ERROR_PREFIX} ${apiName} complete ${ERROR_SUFFIX}`
    };

    if (promise instanceof Array) {
        Promise.all(promise)
            .then(function ([callbackRes, cbRes]) {
                executeByTryCatch(params.success, ERROR_MSG.success, cbRes);
                executeByTryCatch(params.complete, ERROR_MSG.complete, cbRes);
            }).catch(err => {
                const result = err instanceof Error ? {errCode: 904, errMsg: err.message} : err;
                executeByTryCatch(params.fail, ERROR_MSG.fail, result);
                executeByTryCatch(params.complete, ERROR_MSG.complete, result);
            });
    } else {
        promise.then(res => {
            executeByTryCatch(params.success, ERROR_MSG.success, res);
            executeByTryCatch(params.complete, ERROR_MSG.complete, res);
        }).catch(err => {
            const result = err instanceof Error ? {errCode: 904, errMsg: err.message} : err;
            executeByTryCatch(params.fail, ERROR_MSG.fail, result);
            executeByTryCatch(params.complete, ERROR_MSG.complete, result);
        });
    }
};

export {
    executeByTryCatch,
    executeCallback
};

/**
 * @file cbManager
 * @description 二级callback处理
 * @author lijia(lijia30@baidu.com)
 */
import {global} from './global';
let randomId = (+new Date() + '').slice(-3);

/**
 * 获取唯一id，用于一些随机数
 * @return {number} id 随机数
 * @example
 * var jsonpFnName = '_box_' + Bdbox.getId();
 */
const getId = () => randomId++;

/**
 * 二级回调函数挂载处理：目前小程序内端能力一级回调以callback标识，二级回调已cb标识，故命名为cbManager
 *
 * @type {Object}
 */

const cbManager = {

    /**
     * 获取二级回调函数名 getId 递增保证唯一性
     *
     * @return {string}   需要挂载的函数名
     */
    getParamsCBName: () => `_bdbox_extension_pjs_${getId()}`,

    /**
     * 创建二级 Promise && 挂载给客户端的回调函数
     *
     * @param  {Object} params   需要挂载二级回调的参数对象
     * @param  {Function} parser 收到客户端回调后的解析方法
     * @return {Promise}         promise
     */

    createCbPromise: function (params, parser) {
        params.cb = this.getParamsCBName();

        return new Promise((resolve, reject) => {
            global[params.cb] = res => {
                res = parser(res);

                if (+res.status === 0) {
                    resolve(res.data);
                } else {
                    reject({
                        errCode: res.status,
                        errMsg: res.message
                    });
                }
            };
        });
    }

};

/**
 *  创建端回调后直接执行的二级回调(主要针对有跟组件相关的包含上下文关系的api)
 *
 * @param  {Function} callback 回调函数
 * @param  {Function} parser 解析函数
 * @return {string}
 */
const createCallback = (callback, parser) => {
    let fnName = cbManager.getParamsCBName();
    global[fnName] = res => {
        let data = parser(res);
        callback && callback(data.data);
    };
    return fnName;
};

export {
    cbManager,
    createCallback
};
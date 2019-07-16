/**
 * @file method-creator
 * @description 挂载方法构造类
 * @author lijia(lijia30@baidu.com)
 */

import {cbManager} from '../utils/cbManager';
import {executeCallback} from '../utils/executeCallback';

const hostNameReg = /^baidu\./;
export default class MethodCreator {
    constructor(boxjs, desc, baiduPrivateMethodMap, hostMethodMap) {
        this.boxjs = boxjs;
        this.desc = desc;
        this.baiduPrivateMethodMap = baiduPrivateMethodMap;
        this.hostMethodMap = hostMethodMap;
    }

    createMethodMap() {
        const self = this;
        self.desc.forEach(item => {
            let apiName = item.name.replace(hostNameReg, '');
            if (self.baiduPrivateMethodMap[apiName]) {
                self.baiduPrivateMethodMap[apiName].isCbRequired = item.args
                    && item.args.some(arg => arg.name === 'cb');
            }
        });

        const baiduPrivateApiMap = Object.keys(self.baiduPrivateMethodMap).reduce((accumulator, apiName) => {
            accumulator[apiName] = {
                scope: 'root', // 可以通过scope:root来设置方法直接挂载在swan下
                method(args = {}) {
                    const {filter, parser, isCbRequired} = self.baiduPrivateMethodMap[apiName];

                    let params = {...args};

                    if (filter) {
                        params = filter(params);
                    }

                    if (apiName.match('Sync')) {
                        return self.boxjs[`baidu.${apiName}`](params);
                    }

                    let cbPromise = isCbRequired
                        ? cbManager.createCbPromise(params, parser || JSON.parse)
                        : null;

                    const invokePromise = self.boxjs[`baidu.${apiName}`](params);

                    const promise = isCbRequired ? [invokePromise, cbPromise] : invokePromise;

                    executeCallback({
                        promise,
                        apiName
                    }, params);
                }
            };
            return accumulator;
        }, {});

        const hostApiMap = Object.keys(self.hostMethodMap).reduce((accumulator, apiName) => {
            accumulator[apiName] = params => {
                // 宿主方法的处理逻辑写这里
                // ...

                // 调用宿主扩展端能力
                return self.boxjs[apiName](params);
            };
            return accumulator;
        }, {});

        return {...baiduPrivateApiMap, ...hostApiMap};
    }
}

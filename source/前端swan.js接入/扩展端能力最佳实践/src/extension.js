/**
 * @file extension.js
 * @description 智能小程序 extension-demo 入口文件
 * @author lijia(lijia30@baidu.com)
 */
import DescCreator from './utils/description-creator';
import MethodCreator from './utils/method-creator';

import {
    baiduPrivateAsyncDescriptions,
    baiduPrivateSyncDescriptions
} from './description/baidu-private-description';
import {
    hostAsyncDescriptions,
    hostSyncDescriptions
} from './description/host-description';

import {baiduPrivateApiMap} from './method-map/baidu-private-map';
import {hostDescriptionMethodsMap, hostCustomMethodsMap} from './method-map/host-method-map';

console.log('load extension start');

define('swan-extension', ['swan', 'boxjs'], function (require, module, exports, define, swan, boxjs) {
    // 构造需要添加进contain的description列表
    const baiduPrivateDescriptionList = baiduPrivateAsyncDescriptions.concat(baiduPrivateSyncDescriptions);
    const hostDescriptionList = hostAsyncDescriptions.concat(hostSyncDescriptions);
    const descriptionCreator = new DescCreator(baiduPrivateDescriptionList, hostDescriptionList);
    const descriptionList = descriptionCreator.createDescList();

    // 构造需要挂载在swan下的方法
    // 需要调用端能力的方法
    const methodsCreator = new MethodCreator(boxjs, descriptionList, baiduPrivateApiMap, hostDescriptionMethodsMap);
    const descriptionMethodMap = methodsCreator.createMethodMap();

    const customMethodMap = hostCustomMethodsMap;

    const methedsMap = {
        ...descriptionMethodMap,
        ...customMethodMap
    };


    module.exports = {
        // 宿主名，运行时中会被merge到swan下, 作为扩展方法集合的名称
        name: 'xxx',
        // 宿主需要注册的端能力集合
        hostMethodDescriptions: descriptionList,
        // 宿主需要扩展的可调用方法合集
        methods: methedsMap,
        // 宿主需要扩展的可使用组件
        components: {},
        // 宿主扩展统计逻辑
        customLog(swanEventFlow) {}
    };
});

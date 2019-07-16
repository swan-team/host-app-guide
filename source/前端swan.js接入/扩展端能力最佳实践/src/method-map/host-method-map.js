/**
 * @file host-method-map
 * @description 宿主扩展方法map； 宿主扩展方法可以分为两类：
 *              1. 需要调用到宿主扩展端能力的扩展方法
 *              2. 纯前端宿主扩展方法；
 *              3. 正常情况下， 宿主扩展方法都将挂载在swan下的宿主命名空间下
 * @author lijia(lijia30@baidu.com)
 */

// 需要调用到宿主扩展端能力
const hostDescriptionMethodsList = [
    'hostExampleSync',
    'privateDescriptionExampleSync'
];

export const hostDescriptionMethodsMap = {
    ...hostDescriptionMethodsList.reduce((accumulator, apiName) => {
        /**
         * 端能力调用如果需要对参数进行特殊处理，可以将处理逻辑写在filter里
         * @example
         * if (apiName === 'needProcess') {
         *      accumulator[apiName] = {
         *          filter(params) {...}
         *      };
         * }
         */
        accumulator[apiName] = {};
        return accumulator;
    }, {})
};

export const hostCustomMethodsMap = {
    hostTest: (params) => {
        console.log('test host js methods');
    }
}



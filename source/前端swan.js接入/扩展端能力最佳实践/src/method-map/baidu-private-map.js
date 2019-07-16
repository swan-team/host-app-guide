/**
 * @file baidu-private-methods
 * @description 百度私有端能力map
 * @author lijia(lijia30@baidu.com)
 */


// 需要挂载在swan上的百度私用端能力调用方法List
const baiduPrivateApiList = [
    'baidu.privateDescriptionExample',
    'baidu.privateDescriptionExampleSync'
];

export const baiduPrivateApiMap = {
    /**
     * 端能力调用如果需要对参数进行特殊处理，可以将处理逻辑写在filter里; 如果端能力需要二级回调（与客户端确认), 需要添加isCbRequired字段
     * @example
     * if (apiName === 'needProcess') {
         *      accumulator[apiName] = {
         *          filter(params) {...},
         *          isCbRequired: true
         *      };
         * }
     */
    ...baiduPrivateApiList.reduce((accumulator, apiName) => {

        accumulator[apiName] = {};
        return accumulator;
    }, {})
};


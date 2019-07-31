/**
 * @file baidu-private-description
 * @description 百度私有端能力集合配置文件
 * @author lijia(lijia30@baidu.com)
 */

export const baiduPrivateSyncDescriptions = [
    /**
     * 根据宿主实现的百度私有能力进行配置
     * @property {string} name 端能力名称
     * @property {string} authority 端能力scheme中对应的authority
     * @property {string} path 端能力scheme中对应的path
     * @property {Array} args 使用端能力需要注入的参数
     * @property {string} invoke 调用端能力前参数处理的invokeList定义 非必填
     * @property {string} method 前端调用端提供端能力的方法 非必填
     * @property {string} handler 前端调用端提供端能力的方法 非必填
     *
     * 其中 invoke，method, handler在没有特殊处理的情况下（可以跟客户端确认); 不需要填写
     */
    {
        'name': 'baidu.privateDescriptionExampleSync',
        'authority': 'swanAPI',
        'path': '/privateDescriptionExampleSync',
        'args': [
            // name为传参名称， value为传参类型； '='表示该参数为非必填，此配置在swanjs运行时底层会进行参数类型和是否必填的强校验
            {name: 'test', valeu: 'string'},
            {name: 'extension', value: 'string='}
        ]

    }
];

export const baiduPrivateAsyncDescriptions = [
    {
        'name': 'baidu.privateDescriptionExample',
        'authority': 'swanAPI',
        'path': '/privateDescriptionExample',
        'args': [
            // name为传参名称， value为传参类型； '='表示该参数为非必填，此配置在swanjs运行时底层会进行参数类型和是否必填的强校验
            {name: 'test', value: 'string'},
            {name: 'extension', value: 'string='}
        ],
        // invoke，method, handler在没有特殊处理的情况下（可以跟客户端确认); 不需要填写
        invoke: 'xxxxx',
        handler: 'xxxxxx'
    }
];

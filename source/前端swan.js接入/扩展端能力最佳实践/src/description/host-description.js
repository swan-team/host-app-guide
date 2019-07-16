/**
 * @file host-description
 * @description 宿主扩展端能力配置文件
 * @author lijia(lijia30@baidu.com)
 */
export const hostSyncDescriptions = [
    /**
     * 根据宿主扩展的端能力进行配置
     * @property {string} name 端能力名称
     * @property {string} authority 端能力scheme中对应的authority，非必填； 不设置的情况下，swanjs运行时默认赋值swanAPI
     * @property {string} path 端能力scheme中对应的path
     * @property {Array} args 使用端能力需要注入的参数
     * @property {string} invoke 调用端能力前参数处理的invokeList定义 非必填 如自定义需要在框架内注册
     * @property {string} method 前端调用端提供端能力的方法 非必填
     * @property {string} handler 前端调用端提供端能力的方法 非必填
     *
     */
    {
        'name': 'hostExampleSync',
        'authority': 'host',
        'path': '/hostExampleSync',
        'args': [
            {name: 'test', valeu: 'string'},
            {name: 'extension', value: 'string='}
        ]
    }
];

export const hostAsyncDescriptions = [
    {
        'name': 'hostDescriptionExample',
        'authority': 'host',
        'path': '/hostDescriptionExample',
        'args': [
            {name: 'test', valeu: 'string'},
            {name: 'extension', value: 'string='}
        ]
    }
];

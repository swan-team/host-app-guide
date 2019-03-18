# Demo-api

demo-api默认在代码目录下extensions/demo-api,当切换宿主环境为demo时,会使用此插件覆盖和新增api

### 插件说明
- 此插件模拟登陆,授权API,提供了重写登陆,授权的示例,供参考。
- 调用接口 swan.login,获取测试Authorization Code。[登录文档](./docs/login.md)
- 调用接口 swan.authorize,向用户发起授权请求。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。[授权文档](./docs/authorize.md)

- 具体功能逻辑实现详见代码
```
extensions/demo-api/src
├── components
│   └── login
│       ├── index.css
│       ├── index.js                // 登录UI san组件
│       └── preload.js              // preload脚本 用于监听登录webview的成功事件
├── events
│   └── login.js                    // 登录功能主体逻辑
    └── authorize.js                // 授权主体逻辑
├── index.js                        // 登录相关事件监听入口 调用events/login.js
└── webview
    ├── master
    │   └── index.js                
    ├── util
    │   └── constant.js             // 授权相关常量
    ├── scheme
    │   ├── authorize
    │   │   ├── index.js            
    │   │   └── authorize.js        // 授权扩展端能力相入口
    └── └── login
            ├── index.js
            └── login.js            // 登录扩展端能力相入口

```



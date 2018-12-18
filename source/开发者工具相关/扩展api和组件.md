# 扩展api和组件（实现simulator extension）

当开发者要扩展API和组件时,需要先了解[模拟器插件](模拟器插件.md)的一些实现和提供的功能。
可以参考demo,开发一个simulator extension



## 1.一个简单的目录结构

```
├── README.md
├── package.json
└── src 
    ├── assets                        // 静态资源
    ├── webview.js                    // webview中注入的主入口文件
    ├── master.js                    // master中注入的主入口文件
    ├── slave.js                    // slave中注入的主入口文件
    ├── form.js                     // 渲染进程的主入口文件
    └── index.js                      // simulator extension入口文件,提供所有的入口文件配置
```



todo  css如何引入。。

##如何实现插件功能

###package.json

    {
      "name": "host-demo-api",
      "version": "1.0.0",
      "description": "demo api",
      "type": "simulator",
      "main": "./src",
      "dependencies": {
    
      }
    }

###index.js
index.js是整个simulator extension的入口文件,需要返回给渲染进程、webview的入口文件地址。
根据实现的功能不同,至少要包含4个entry中的一个入口。

    module.exports = context => {
        return {
            "name": "host-demo-api",
            "codeHint": {},  // 代码提示 todo
            "entry": {
                "form": {
                    "main": "./src/form.js",
                    "styles": [] // todo 样式如何引入
                },
                "master": {
                    "main": "./src/preload/master.js"
                },
                "slave": {
                    "main": "./src/preload/slave.js"
                },
                "webview": {
                    "main": "./src/preload/webview.js"
                }
            }
        };
    };

###渲染进程入口form.js
```
module.exports = {
    onInit(basicContext) {},
    onReady(context) {},
    onRefresh(context) {},
    onDestroy(context) {}
}
```

推荐复杂的功能在此实现,通过事件来进行通信,这样会有效提升模拟器刷新的性能。
渲染进程入口有四个生命周期:
#### onInit
onInit会在模拟器初始化时被调用，提供了basicContext，basicContext包括了以下功能：
event cookie network
#### onReady onRefresh onDestroy

onReady会在模拟器启动完成时被调用；

onRefresh会在模拟器刷新时被调用；

onDestroy会在模拟器销毁时被调用；

它们都会提供一个对象context，context包括以下功能：

event cookie network el

###master.js/slave.js/webview/js

```
module.exports = {
    schemeHandlers: {},
    middleWares: [],
    syncMiddleWares: [],
    onInit(basicContext) {},
    async onReady(context) {},
    onRefresh(context) {},
    onDestroy(context) {}
}
```
webview进程入口包含以下属性：
#### onInit
onInit会在模拟器初始化时被调用，onInit提供了basicContext，basicContext包括了以下属性：
- fs
    - copy
    - createReadStream
    - createWriteStream
    - emptyDir
    - ensureDir
    - ensureFile
    - getFolderSize
    - isDirectory
    - isDirEmpty
    - isFile
    - isSymlink
    - mkdir
    - move
    - pathExists
    - readdir
    - readFile
    - readJson
    - readlink
    - remove
    - rename
    - stat
    - symlink
    - unlink
    - writeFile
    - writeJson
- event
    - send
    - sendTo
    - on
- cookies
    - 参照https://electronjs.org/docs/api/cookies#cookiesgetfilter-callback
- network
    - request
#### onReady
onReady会在模拟器启动完成时被调用；onReady提供了context，除了上面提到的basicContext中的属性，还包含以下属性：
- webviewId
- device
- project
    - sdk
    - sourceCodePath
    - compiledCodePath
- cache
    - clear
    - get
    - getAllSync
    - getSync
    - remove
    - set
    - setSync
- storage
    - clear
    - get
    - getAllSync
    - getSync
    - remove
    - set
    - setSync
- app
    - appId
    - appVersion
    - config
    - extConfig
    - serverInfo
    - startParams
    - staticServer
    - swanCoreVersion
    - userDataPath
- utils
    - execute
    - parse
    - clipboard
    - getVirtualPath
    - getPhysicalPath

#### onDestroy
onDestroy会在模拟器销毁时被调用；onDestroy提供的context和onReady中的相同。

#### schemeHandlers
schemeHandlers用于实现相应的swan-api
schemeHandlers的函数签名如下：

`(context: Context) => (schemeInfo: SchemeInfo) => any`

其中Context和onReady中的context相同，schemeInfo包含以下属性：
- raw
- action
- boxType
- schemeName
- query
    - params
- ver

#### middleWares和syncMiddleWares
middleWare和syncMiddleWares都用来声明中间件

middleWares会在异步的schemeHandlers中增加中间件，而syncMiddleWares会在同步的schemeHandlers中增加中间件，通过action可以区分一个scheme是同步处理还是异步处理，同步处理的scheme中action一定包含Sync。

它们的函数签名为：

`(context: Context) => (schemeInfo: SchemeInfo) => (next: Handler) => any`

其中Context和SchemeInfo和上文schemeHandlers中的相同，Handler为处理schemeInfo的函数。

下面是一个简单的中间件例子，会打印所有异步schemeHandler处理前和处理后的scheme信息：

```
exports.logger = context => next => async scheme => {
            console.debug('【scheme before】', scheme.action, scheme);
            await next(scheme);
            console.debug('【scheme after】', scheme.action, scheme);
        };
```

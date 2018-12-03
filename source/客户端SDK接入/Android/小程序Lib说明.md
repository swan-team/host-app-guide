#### demo
	
小程序的 demo 示例，具有基本的运行小程序的能力。包含接入小程序需要做的初始化工作 & 小程序能力接口的实现（目前是空实现）

#### lib-aopannotation-empty 

启动耗时性能监控用的，小程序的 core 代码里用到了这个库里的 Annocation，这里为了编译通过，仅仅带上这个空工程。真正的耗时逻辑是通过 gradle 插件实现，这里没用到，仅用于百度 App 上，外部不需要处理

#### lib-ar

小程序里提供了 AR 相机的能力，直接集成了AR 的 jar 包，如果不需要可以自行去掉
 
#### lib-bdwebview 

小程序使用的 WebView 组件，目前是通过 Sailor SDK直接桥接的系统WebView。（注意：系统 WebView 在 Android5.0 以下有问题，小程序需要从 Android5.0 及以上开始支持）

#### lib-browser-base 

小程序内部浏览器框架的分类，目前为了和百度App保持一致，直接扣取的代码，第三方不用关心，直接集成即可

#### lib-event-bus 

小程序内部使用到了 RxJava 和对 RxJava 封装的 RxBus，这个库作为基础提供

#### lib-multiprocess 

如果使用百度App的 UBC（天幕）打点系统（下边的 lib-ubc lib），才需要这个库，进行跨进程打点用的。

#### lib-ng-aiapps

小程序的 core 代码，这个是小程序的主 lib，其他 lib 都是为他服务的。

#### lib-ng-aiapps-download 

小程序 SDK 从 Server 拉取 SwanJs 和小程序包的下载能力，直接接入百度App的 APS 后台，内部直接集成。

#### lib-ng-aiapps-menu

小程序内部使用的菜单 View

### lib-ng-aiapps-ubc-empty 

如果不使用百度的 UBC 打点，需要依赖这个库（不用依赖 lib-ubc），所有的打点会空实现。

### lib-no-proguard

小程序里有一部分代码不能混淆，是通过实现了这个库里的 NoProGuard 接口完成的，在打包的时候需要配置混淆规则，详见 demo/proguard-rules.pro

### lib-process-ipc

由于小程序是运行在独立进程的，需要多进程间通信，这个lib是用来多进程通信的。

### lib-runtime 

小程序 SDK 的运行时环境，需要在 App 启动的时候调用，详情参考 *初始化说明*

### lib-slide 

小程序内部使用到了侧滑返回页面的能力，这个库提供侧滑功能

### lib-ubc 

如果要使用百度App的 UBC 打点，将统计打到天幕平台，需要使用这个 lib，这个 lib 需要依赖 lib-multiprocess（lib-ubc 和 lib-ng-aiapps-ubc-empty 二选一，如果需要统计就用 lib-ubc，否则就用 lib-ng-aiapps-ubc-empty）

### lib-united-scheme-core

小程序内部的通信是使用 Scheme 协议完成的，这个是小程序内部的通信框架

### lib-v4-fragment

下程序使用到了 Fragment，但是不同版本的 v4 包有 bug，这里使用了自带的 Fragment，而不是用系统的 v4 包提供的

### lib-websocket

小程序里的 webSocket 能力

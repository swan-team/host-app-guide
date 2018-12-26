#### demo
	
 小程序的demo示例，具有基本的运行小程序的能力。包含接入小程序需要做的初始化工作 & 小程序能力接口的实现（作为参考）。

#### lib-browser-base 

小程序内部浏览器框架的分类，目前为了和百度App保持一致，直接扣取的代码，第三方不用关心，直接集成即可

#### lib-event-bus 

小程序内部使用到了 RxJava 和对 RxJava 封装的 RxBus，这个库作为基础提供

#### lib-multiprocess 

如果使用手百的UBC（天幕）打点统计系统（下边的lib-swan-ubc lib），才需要这个库，进行跨进程打点用的（如果不使用统计能力，可以不需要这个lib），由于小程序是多进程架构，为避免统计冲突，所有的统计都会放到主进程进行统一处理。

#### lib-swan-core

小程序的core代码，这个是小程序的主lib，其他lib都是为他服务的。

#### lib-swan-menu

小程序内部使用的菜单 View

### lib-process-ipc

由于小程序是运行在独立进程的，需要多进程间通信，这个lib是用来多进程通信的，可以代理各种操作到主进程。

### lib-runtime 

小程序 SDK 的运行时环境，需要在 App 启动的时候调用，详情参考 *初始化说明*

### lib-slide 

小程序内部使用到了侧滑返回页面的能力，这个库提供侧滑功能

### lib-swan-ubc 

小程序本身自带各种统计打点，外部对接Case默认不提供打点能力，属于可选（可选择打点到百度，也可选择打点到指定的地址，也可以选择不要打点功能，不打点不需要集成此lib）。

### lib-protobuf

lib-swan-ubc库使用的打点统计格式，规定了统计的形式采用protobuf形式存储，如不需要统计，可以不用此lib。

### lib-united-scheme-core

小程序内部的通信是使用 Scheme 协议完成的，这个是小程序内部的通信框架。

### lib-swan-v4-fragment

小程序使用到了fragment，这里使用了定制的fragment，而不是用系统的v4包提供的。

### lib-websocket

小程序里的 webSocket 能力

### local-maven

搭建的本地maven仓库，用于存放gralde插件**后续放到中央仓库**

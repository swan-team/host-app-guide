# 小程序 Lib 说明

|Lib 名词|解释|
|--|--|
|demo|小程序的demo示例，具有基本的运行小程序的能力。包含接入小程序需要做的初始化工作 & 小程序能力接口的实现（作为参考）。|
|lib-elastic-thread|自主开发的高性能线程池|
|lib-event-bus |小程序内部使用到了 RxJava 和对 RxJava 封装的 RxBus，这个库作为基础提供。|
|lib-gamebox |云游戏（不是小游戏）库，仅可用于百度内部，接入可选。|
|lib-multiprocess |如果使用手百的UBC（天幕）打点统计系统（下边的lib-swan-ubc lib），才需要这个库，进行跨进程打点用的（如果不使用统计能力，可以不需要这个lib），由于小程序是多进程架构，为避免统计冲突，所有的统计都会放到主进程进行统一处理。|
|lib-net |小程序/小游戏中使用的网络框架，对okhttp的封装。|
|lib-nuomi-pay |百度支付，目前仅可用于百度内部。|
|lib-swan-core|小程序的 core 代码，这个是小程序的主 lib，其他 lib 都是为他服务的。|
|lib-swan-menu|小程序内部使用的菜单 View。|
|lib-support-empty |为了和手百业务分离，使其可正常编译通过，引入的支持库，不用关心。|
|lib-swan-ad |小游戏的广告组件。|
|lib-swan-audio |小游戏的音频系统。|
|lib-swan-mario |小游戏引擎系统。|
|lib-swan-pms |小程序、小游戏程序包下载系统。|
|lib-swan-utils |小程序、小游戏的公用工具库。|
|lib-swan-uuid |接入宿主在一台设备上的唯一id，同一台手机上所有的宿主id相同。|
|lib-process-ipc|由于小程序是运行在独立进程的，需要多进程间通信，这个 lib 是用来多进程通信的，可以代理各种操作到主进程。|
|lib-swan-apt|小程序的代码生成器，用于生成一些固定的代码文件|
|lib-swan-bdtls|建立在https之上的加密套件（为了防止抓包），目前需要百度的server支持，外部没启用|
|lib-runtime |小程序 SDK 的运行时环境，需要在 App 启动的时候调用，详情参考 *初始化说明*|
|lib-slide |小程序内部使用到了侧滑返回页面的能力，这个库提供侧滑功能。|
|lib-swan-ubc |小程序本身自带各种统计打点，外部对接 Case 默认不提供打点能力，属于可选（可选择打点到百度，也可选择打点到指定的地址，也可以选择不要打点功能，不打点不需要集成此 lib）。|
|lib-protobuf|lib-swan-ubc 库使用的打点统计格式，规定了统计的形式采用 protobuf 形式存储，如不需要统计，可以不用此lib。|
|lib-united-scheme-core|小程序内部的通信是使用 Scheme 协议完成的，这个是小程序内部的通信框架。|
|lib-swan-v4-fragment|小程序使用到了 fragment，这里使用了定制的 fragment，而不是用系统的 v4 包提供的。|
|lib-websocket|小程序里的 webSocket 能力|
|lib-video|小程序的视频播放组件，提供百度云和系统两种可选，见下表|
|lib-swan-webview|小程序与小游戏用到的so和百度t7浏览内核相关，详细见下表|
|local-maven|搭建的本地maven仓库，用于存放gralde插件**后续放到中央仓库**。|


# lib-video子库说明（使用其一即可）
|Lib 名词|解释|
|--|--|
|lib-bd-videoplayer|百度云播放器实现的video组件，播放性能比系统的mediaPlayer好，但是体积大|
|lib-sys-videoplayer|使用系统mediaPalyer实现的video组件，播放性能没有专业视频播放好，但是体积小|

注：宿主可以选择实现自己的视频播放器，以上两种都不用；也可以根据考虑选用以上提供的一种。

# lib-swan-webview 子库说明（将t7内核和需要的so到这个库里）
|Lib 名词|解释|
|--|--|
|lib-swan-sailor|百度高性能T7浏览内核java层，此库需要结合libzeuswebviewchromium.so，libcom.baidu.zeus.so使用，否则自动降级为系统webview|
|lib-swan-sailor-downloader|由于v8引擎和T7内核的so较大，此库提供so后下载的能力，用于减少包大小，so后下载必须打包下载lib-swan-sailor-so中提供的***所有so***为一个zip，否则无法正常按安装|
|lib-swan-sailor-installer|如果使用了so后下载，这个库用来安装后下载的so，so的安装是和T7内核有紧密联系的，所以要求so后下载必须打包下载lib-swan-sailor-so中提供的***所有so***为一个zip|
|lib-swan-sailor-so|v8引擎和T7内核使用的所有so的集合，***支持同层渲染***|
|lib-swan-sailor-so-lite|v8引擎的so，***没有T7内核***，可正常运行小程序和小游戏的最小so集合，不支持同层渲染，同层渲染自动降级为普通的H5元素，主要是处于体积考虑，和lib-swan-sailor-so根据业务需要二选一|
|lib-swan-webcore|lib-swan-sailor的依赖库|
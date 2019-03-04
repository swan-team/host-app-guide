# 扩展 -- 统计事件list
## 介绍
框架运行时的内部在各个关键节点都派发了事件，宿主开发者可以在 extension.js 中的 `customLog` 方法中使用其参数的`swanEventFlow`对象来监听这些事件。

在`extension.js`中，宿主开发者可以写一个名为`customLog`的函数。运行时框架会在启动时调用用宿主开发的`customLog`函数，并给开发者的扩展代码传入`swanEventFlow`事件流对象。

## swanEventFlow支持接口如下：

|接口名称|作用|参数|
|:---- |:---- |:---- |
| onMessage | 监听某一事件|type:String, handler:Function, options:Object |
|delHandler|移除事件流上的某一个事件监听|type:String, handler:Function|
|fireMessage|在当前事件流上派发事件||

由上我们可以看出，宿主可以使用`swanEventFlow`对象，对小程序的各个生命周期关键事件发生节点进行监听。那么开发者可以具体利用的生命周期和事件都有哪些呢？请参见以下列表：
###生命周期：ApplifeCycle

|事件名称|触发时机|
|:---- |:---- |
| onLaunch | 在小程序启动时，即首次进入 |
| onShow | 小程序展示时(包含当前页面第一次展示/小程序切换到前台/覆盖在该页面上的其他页面销毁)| |
| onHide | 小程序隐藏时（包含home键切换到后台/被其他页面覆盖） |
| onError | 小程序的生命周期内，发生错误时 |

###生命周期：PagelifeCycle

|事件名称|触发时机|
|:---- |:---- |
| onLoad | 小程序的某个页面加载 |
| onShow | 小程序的某个页面展示 |
| onReady | 页面初次渲染完成，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互| |
| onHide | 小程序某个页面隐藏 |
| onUnload | 小程序某个页面被卸载 |
| onPullDownRefresh | 页面发生下拉刷新时 |
| onReachBottom | 页面上拉触底 |
| onPageScroll | 页面滚动 |
| shareAction| 点击转发 |
| shareSuccess| 转发成功 |
| shareFailed | 转发失败 |

###生命周期：TraceEvents

| 事件名称 | 触发时机 |
|:---- |:---- |
| masterPreloadStart| master预加载开始 |
| masterPreloadCreateHistorystack| 页面栈建立完成 |
| masterPreloadCommunicatorListened| 通讯监听已开启 |
| masterPreloadVirtualComponentFactoryInstantiated|用户的自定义组件的创建工厂实例化完成 |
| masterPreloadExtensionInstantiated| 宿主扩展实例化完成 |
| masterPreloadAllSlaveEventsListened| 所有页面级相关事件已开启监听 |
| masterPreloadMountMastermanagerToGlobal| mastermanager创建成功 |
| masterPreloadContextDecorated| 对开发者暴露的上下文已完成装饰 |
| masterPreloadAppReadyListened| master开始监听用户active |
| masterPreloadEnd| master预加载结束 |
| -- | -- |
| slavePreloadStart| slave预加载开始 |
| slavePreloadGetComponents| 所有组件已被获取 |
| slavePreloadGetComponentFactory| 拿到组件工厂 |
| slavePreloadDefineComponentsStart| 定义组件开始 |
| slavePreloadDefineComponentsEnd| 定义组件结束 |
| slavePreloadPageReadyListened| slave开始监听用户active |
| slavePreloadEnd| slave预加载结束 |
| -- | -- |
|masterActiveStart|用户进入小程序 |
|masterActiveInitRenderStart|初始化渲染 |
|masterActivePushInitSlaveStart|入栈开始 |
|masterActiveCreateInitSlave|创建初始slave |
|masterActiveInitAction|初始化第一个页面 |
|masterActiveInitBindingEnvironmentEvents| App环境相关事件已监听 |
|masterActiveAppJsLoaded|app.js加载结束 |
|masterActiveCreateInitslaveEnd|创建初始slave结束 |
|masterActivePushInitslaveEnd|入栈结束 |
|masterActiveCreatePageFlowStart|创建页面流开始 |
|masterActiveGetUserPageInstance|创建用户page |
|masterActiveInitUserPageInstance| 初始化用户page实例 |
|masterActiveCreatePageFlowEnd|创建页面流结束 |
|masterActiveSendInitdataStart|发送数据开始 |
|masterActiveSendInitdataEnd|发送数据结束 |
|masterActiveOnqueueInitslave|slave的onEnqueue生命周期函数已执行 |
| -- | -- |
|slaveActiveStart|用户打开一个新的webview |
|slaveActivePageLoadStart|开始加载开发者业务资源 |
|slaveActiveCssLoaded|css加载完成 |
|slaveActiveSwanJsStart|模板业务代码开始加载 |
|slaveActivePageRender|Page组件开始定义 |
|slaveActiveDefinePageComponentEnd|Page组件定义已完成 |
|slaveActivePageComponentInstantiated|初始化页面对象已完成 |
|slaveActiveNoticeMasterSlaveloaded|调用页面对象的加载完成已通知master |
|slaveActiveJsParsed|slavejs解析完成 |
|slaveActiveSwanJsLoaded|模板业务代码加载完成 |
|slaveActiveReceiveInitData| slave接收到数据 |
|slaveActiveRenderStart| slave接收到数据后渲染页面开始 |
|slaveActiveRenderEnd| slave接收到数据后渲染页面结束 |
|slaveActivePageAttached| 页面加载完成 |

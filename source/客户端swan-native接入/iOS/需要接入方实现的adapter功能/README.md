<!-- TOC -->

- [1. Adapter层接口实现说明](#1-Adapter层接口实现说明)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 必选接口列表](#131-必选接口列表)
        - [1.3.2. 可选接口列表](#132-可选接口列表)
        - [1.3.3. 实现步骤](#133-实现步骤)

<!-- /TOC -->
# 1. Adapter层接口实现说明
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-10|初始版本|
|2.7.0|2019-06-11|修订版本|

--------------------------
## 1.2. 功能说明
> 本文档介绍如何实现BBASM工程需要宿主实现的接口，每个Adapter的协议里面有：@required、@optional，required类型的必须实现，optional根据宿主情况，不是必须实现接口；

## 1.3. 开发指南
### 1.3.1. 必选接口列表
> 宿主接入了相关功能的小程序，必须实现的接口；


|功能|协议|说明|参考实现|
|:--|:--|:--|:--|
|[入口](Platform.md)| BBASMPlatformAdapterProtocol | 务必确保hostConfig接口配置正确的宿主信息（shareCallBackUrl请使用宿主自己的分享地址） | BBASMPlatformImplement |
|[入口](导航栏.md)| BBASMNavigatorAdapterProtocol | 务必实现rootNavigationController接口：设置宿主的根导航栈 | BBASMNavigatorImplement | 
|[入口](Util.md)| BBASMUtilAdapterProtocol | 务必实现unzipFilePath接口：小程序包解压| BBASMUtilImplement | 
|[日志](日志.md)| BBASMLogAdapterProtocol | 宿主不需要修改代码，在开源demo中直接将SmallAppImpl下的UBC代码拷贝到宿主工程 | BBASMLogImplement |
|[账号](账号.md)| BBASMAccountAdapterProtocol | 注意：accountChangeNotificationName接口实现宿主的账号登录变化通知名；getUserInfo接口里面返回的字典中userZid，不管登录状态，都需要传值（标识唯一设备用户id），用于 风控 | BBASMAccountImplement |
|[授权](授权.md)| BBASMAuthorizeAdapterProtocol | 宿主需要实现授权接口，接入自己的服务（百度系的产品拷贝源码） | BBASMAuthorizeReqestImplement |
|[定位](定位.md)| BBASMLocationAdapterProtocol | | BBASMLocationImplement |
|[图片](图片.md)| BBASMPhotoAdapterProtocol | chooseAlbumWithMaxNumber接口暂不需要实现 | BBASMPhotoImplement |
|[视频](视频.md)| BBASMVideoAdapterProtocol | demo中提供的视频播放参考实现，宿主app不能直接拿来使用 | BBASMVideoImplement |
|[分享](分享.md)| BBASMShareAdapterProtocol | 宿主分享的URL：BBASMPlatformAdapterProtocol协议中hostConfig的shareCallBackUrl+小程序的信息 | BBASMShareImplement |
|[支付](支付.md)| BBASMPaymentAdapterProtocol | 宿主方需要实现直连接口（百度系的产品需要加上聚合支付接口实现） |
|[扫码](扫码.md)| BBASMScanCodeAdapterProtocol | | BBASMScanCodeImplement |


### 1.3.2. 可选接口列表
> 宿主接入了相关功能的小程序，"可选接口列表"宿主方App可以根据自身能力，进行自由选择实现；

|功能|协议|说明|参考实现|
|:--|:--|:--|:--|
|[直播](直播.md)| BBASMLiveAdapterProtocol | |
|[地图](地图.md)| BBASMMapLocationAdapterProtocol、BBASMMapAdapterProtocol、BBASMMapSearchAdapterProtocol、BBASMMapKitSearchProtocol | | BBASMMapLocationImplement |
|[地址](地址.md)| BBASMShippingAddressAdapterProtocol | | BBASMShippingAddressImplement |
|[发票](发票.md)| BBASMInvoiceAdapterProtocol | | BBASMInvoiceImplement |
|[菜单栏](菜单栏.md)| BBASMPannelAdapterProtocol | | BBASMPannelImplement |
|[WebView](WebView.md)| BBASMWebViewAdapterProtocol | |
|[调试](调试.md)| BBASMDebugAdapterProtocol | 百度系产品需要实现这个协议 |


### 1.3.3. 实现步骤
* 1、Adapter协议头文件引用

```
#import <BBASMNavigatorAdapterProtocol.h>
```
* 2、继承`BBASMAdapterBaseImplement` ，声明要实现的接口

```
@interface BBASMNavigatorImplement : BBASMAdapterBaseImplement <BBASMNavigatorAdapterProtocol>

@end
```
* 3、Adapter协议与实现类绑定
  
  在实现Adapter协议的.m中，调用" RegisterSwanAdapter() "

* 4、实现Adapter接口方法

```
#import "BBASMNavigatorImplement.h"
#import "AppDelegate.h"

@implementation BBASMNavigatorImplement

RegisterSwanAdapter()

// 小程序入口导航栈
+ (UINavigationController *)rootNavigationController {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    UINavigationController *appRootVC = (UINavigationController *)appDelegate.window.rootViewController;
    return appRootVC;
}

+ (void)appInNavigationStack:(BOOL)bInStack {
    if (bInStack) {
        NSLog(@"小程序进场");
    } else {
        NSLog(@"小程序退场");
    }
}

@end

```




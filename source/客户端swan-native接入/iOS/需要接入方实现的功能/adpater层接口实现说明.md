<!-- TOC -->

- [1. adapter层接口实现说明](#1-adapter层接口实现说明)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 必选接口列表](#131-必选接口列表)
        - [1.3.2. 可选接口列表](#132-可选接口列表)
            - [1.3.2.1. 无默认实现的接口](#1321-无默认实现的接口)
            - [1.3.2.2. 有默认实现的接口](#1322-有默认实现的接口)
        - [1.3.3. 实现步骤](#133-实现步骤)

<!-- /TOC -->
# 1. adapter层接口实现说明
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-13|初始版本|

--------------------------
## 1.2. 功能说明
本文档介绍如何实现SWAN工程需要宿主实现的接口

## 1.3. 开发指南
### 1.3.1. 必选接口列表
> 宿主接入了相关功能的小程序，必须实现的接口


* ├── [Account](登录.md)
* │   └── `SWANAccountProtocol.h`
* ├── [Authorize](授权.md)
* │   └── `SWANAuthorizeReqestProtocol.h`
* ├── [Platform](Platform.md)
* │   └── `SWANPlatformProtocol.h`
* ├── [Video](视频.md)
* │   └── `SWANVideoProtocol.h`
* ├── [Location](定位.md)
* │   └── `SWANLocationProtocol.h`
* ├── [Payment](支付.md)
* │   └── `SWANPaymentProtocol.h`
* ├── [Photo](图片.md)
* │   └── `SWANPhotoProtocol.h`
* ├── [ScanCode](二维码扫描.md)
* │   └── `SWANScanCodeProtocol.h`
* ├── [Share](分享.md)
* │   └── `SWANShareProtocol.h`


### 1.3.2. 可选接口列表
#### 1.3.2.1. 无默认实现的接口
* ├── [Invoice](地址、发票.md)
* │   └── `SWANInvoiceProtocol.h`
* ├── [Live](直播.md)
* │   └── `SWANLiveProtocol.h`
* ├── [Map](地图.md)
* │   ├── `SWANMapLocationProtocol.h`
* │   ├── `SWANMapProtocol.h`
* │   ├── `SWANMapSearchProtocol.h`
* │   ├── `BBAMapKitPoiInfoProtocol.h`
* ├── [ShippingAddress](地址、发票.md)
* │   └── `SWANShippingAddressProtocol.h`
* ├── [UI](UI.md)
* │   └── `SWANNavigatorProtocol.h`
* ├── [Form](Form.md)
* │   └── `SWANFormProtocol.h`

#### 1.3.2.2. 有默认实现的接口
> 如下接口，小程序框架提供了默认实现，宿主可以根据自己的需要进行修改

* ├── [配置项](ConfigOption.md)
* │   └── SWANConfigOptionProtocol.h 


### 1.3.3. 实现步骤
* 1、头文件import对应的接口,

```
#import <SWANNavigatorProtocol.h>
```
* 2、继承`SWANAdapterBaseImplement` 声明要实现的接口

```
@interface SWANNavigatorImplement : SWANAdapterBaseImplement <SWANNavigatorProtocol>

@end
```
* 3、注册接口
> <font color='red'>注意文件名必须和类名一致，否则注册失败</font>

```
mnp_registerAdapter(SWANNavigatorImplement)

```

* 4、实现接口方法

```
#import "SWANNavigatorImplement.h"
#import "AppDelegate.h"

@implementation SWANNavigatorImplement

mnp_registerAdapter(SWANNavigatorImplement)

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




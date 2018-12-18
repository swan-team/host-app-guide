<!-- TOC -->

- [1. adapter层接口实现说明](#1-adapter层接口实现说明)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 需要实现的接口列表](#131-需要实现的接口列表)
            - [1.3.1.1. 无默认实现的接口](#1311-无默认实现的接口)
            - [1.3.1.2. 有默认实现的接口](#1312-有默认实现的接口)
        - [1.3.2. 实现步骤](#132-实现步骤)

<!-- /TOC -->
# 1. adapter层接口实现说明
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-13|初始版本|

--------------------------
## 1.2. 功能说明
本文档介绍如何实现BBAMNP工程需要宿主实现的接口

## 1.3. 开发指南
### 1.3.1. 需要实现的接口列表
#### 1.3.1.1. 无默认实现的接口
> 宿主接入了相关功能的小程序，必须实现的接口

* ├── [Account](登录.md)
* │   └── `BBAMNPAccountProtocol.h`
* ├── [Authorize](授权.md)
* │   └── `BBAMNPAuthorizeReqestProtocol.h`
* ├── [Camera](拍照.md)
* │   └── `BBAMNPCameraProtocol.h`
* ├── [Platform](Platform.md)
* │   └── `BBAMNPPlatformProtocol.h`
* ├── [Invoice](地址、发票.md)
* │   └── `BBAMNPInvoiceProtocol.h`
* ├── [Live](直播.md)
* │   └── `BBAMNPLiveProtocol.h`
* ├── [Location](定位.md)
* │   └── `BBAMNPLocationProtocol.h`
* ├── [Map](地图.md)
* │   ├── `BBAMNPMapLocationProtocol.h`
* │   ├── `BBAMNPMapProtocol.h`
* │   ├── `BBAMNPMapSearchProtocol.h`
* │   ├── `BBAMapKitPoiInfoProtocol.h`
* ├── [Payment](支付.md)
* │   └── `BBAMNPPaymentProtocol.h`
* ├── [Photo](图片.md)
* │   └── `BBAMNPPhotoProtocol.h`
* ├── [ScanCode](二维码扫描.md)
* │   └── `BBAMNPScanCodeProtocol.h`
* ├── [Share](分享.md)
* │   └── `BBAMNPShareProtocol.h`
* ├── [ShippingAddress](地址、发票.md)
* │   └── `BBAMNPShippingAddressProtocol.h`
* ├── [UI](UI.md)
* │   └── `BBAMNPNavigatorProtocol.h`
* ├── [Video](视频.md)
* │   └── `BBAMNPVideoProtocol.h`
* ├── [Form](Form.md)
* │   └── `BBAMNPFormProtocol.h`

#### 1.3.1.2. 有默认实现的接口
> 如下接口，小程序框架提供了默认实现，宿主可以根据自己的需要进行修改

* ├── [配置项](ConfigOption.md)
* │   └── BBAMNPConfigOptionProtocol.h 

### 1.3.2. 实现步骤
* 1、头文件import对应的接口,

```
#import <BBAMNPNavigatorProtocol.h>
```
* 2、继承`BBAMNPAdapterBaseImplement` 声明要实现的接口

```
@interface BBAMNPNavigatorImplement : BBAMNPAdapterBaseImplement <BBAMNPNavigatorProtocol>

@end
```
* 3、注册接口

```
mnp_registerAdapter(BBAMNPNavigatorImplement)

```

* 4、实现接口方法

```
#import "BBAMNPNavigatorImplement.h"
#import "AppDelegate.h"

@implementation BBAMNPNavigatorImplement

mnp_registerAdapter(BBAMNPNavigatorImplement)

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



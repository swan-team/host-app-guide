<!-- TOC -->

- [1. SWANUtilitiesProtocol](#1-SWANutilitiesprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANUtilitiesProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 工具方法


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
Pyramid.bba_MNPUtilities
```
* 2、调用方法

```
[Pyramid.bba_MNPUtilities getCurrentNavigationController]
```
* 3、方法列表

```
  +(UIViewController<SWANSlaveWebViewControllerProtocol,SWANSlaveWebViewControllerUIProtocol> *)getSlaveWebVCById:(NSString *)slaveId
                                 appId:(NSString *)appId;
///获取appid
+ (NSString *)currentAppID:(BBASchemeDispatcher *)dispatcher;
///获取name
+ (NSString *)currentAppName:(BBASchemeDispatcher *)dispatcher;
///根据appID 获取appName
+ (NSString *)appName:(NSString *)appID;
/// 获取当前的导航栈控制器
+ (UINavigationController *)getCurrentNavigationController;

/// 查找NavigationBar的shadowImageView
+ (UIImageView *)findShadowImageViewForNavigationBar:(UIView *)view;

/// 获取Window上topVC的导航栈，如果是小程序，则是小程序所在的导航栈控制器，否则则是百度App的导航栈控制器
+ (UINavigationController *)getTopNavigationController;

///获取appKey
+ (NSString *)currentAppKey:(BBASchemeDispatcher *)dispatcher;

+ (id<SWANMessageItemProtocol>)getMessageItemByAppId:(NSString *)appId
                                                castId:(NSString *)castId;
+ (void)addMessageItem:(id<SWANMessageItemProtocol>)item
                castId:(NSString *)castId
                 appId:(NSString *)appId;

/**
 判断字符串是否数字类型

 @param aString  aString
 @return YES 是数字
 */
+ (BOOL)isStringPureInt:(NSString *)aString;

/// 获取百度App的导航栈控制器
+ (UINavigationController *)getBDAppNavigationController;

/// 获取当前小程序所在的导航栈控制器
+ (UINavigationController *)getMNPNavigationController;

/// 获得导航栈中顶部的slaveWebVC或者gameVC
+ (UIViewController *)getNavigationTopViewController;

/*!
 *    @brief    判断当前的salveid 对应的slaveViewController是否是首页
 *
 *    @param     slaveID slaveID
 *    @param     appID     appID
 *
 *    @return    YES 是首页
 */
+ (BOOL)isFisrtSlaveViewController:(NSString *)slaveID
                             appid:(NSString *)appID;

```



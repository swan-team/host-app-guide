<!-- TOC -->

- [1. Platform](#1-platform)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 协议](#131-协议)
        - [1.3.2. 接口列表](#132-接口列表)
        - [1.3.3. 示例](#133-示例)
    - [1.4. 备注](#14-备注)

<!-- /TOC -->

# 1. Platform
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-10|初始版本|
|2.7.0|2019-06-12|adapter协议优化|

--------------------------
## 1.2. 功能说明
配置小程序框架运行环境的参数
## 1.3. 开发指南
### 1.3.1. 协议
BBASMPlatformAdapterProtocol
### 1.3.2 接口列表


@required

* 请求接口

```
/// 公参接口 (后期废弃)；百度系宿主需要返回自己的公参，非百度系宿主直接返回百度的公参
+ (NSString *)composeParameters;

/// 服务端接口 (后期废弃)；返回百度的根服务器地址
+ (NSString *)rootServerHost;
```

* 宿主方的配置信息

```
/*
 * @brief 设置宿主方的配置信息，来源于开源B端平台下发的配置数据(json)
 * @return NSDictionary，格式：{@"officialNo":联盟标识(百度系的为1),
 *                            @"containerNo":渠道号(标识宿主来源),
 *                            @"hostName":宿主名称(手百为baiduboxapp),
 *                            @"schemeHead":宿主协议头(手百为baiduboxapp),
 *                            @"shareCallBackUrl":宿主方分享回调地址(手百默认从swan core中取),
 *                            @"version":@(1)(配置信息版本号)}
 */
+ (NSDictionary *)hostConfig;

/// 用户字体大小设置，全局字体四级level（小：1|中：2|大：3|特大：4），默认中级(2)
+ (NSString *)globalFontSizeLevel;

/// private：mtj的唯一标识，百度系的产品，需要设置MTJ的cuid；
+ (NSString *)mtjCUID;

/// 获取设备唯一标识，请使用宿主自己的设备id；（注：百度系的产品使用统一cuid库）
+ (NSString *)getDeviceIdentity;

/**
 * @brief 当前网络状态；(后期废弃)
 *
 * @return NSString，value：Unknown（默认）、WiFi、2G、3G、4G
 */
+ (NSString *)currentNetworkTypeString;

```

* 宿主extension接口

```
/**
 * @brief 指定宿主对extension版本号的支持规则
 *
 * @return NSString，extensino版本号的支持规则
 */
+ (NSString *)extensionRule;

/**
 * @brief 获取预置extension包文件的完整路径，要求文件格式是zip
 * @return 返回预置extension包的完整路径
 */
+ (NSString *)presetExtensionPackageBundlePath;

/**
 * @brief 获取预置extension包版本号
 * @return 返回预置extension包版本号
 */
+ (NSString *)presetExtensionPackageVersion;

```

* 端能力描述接口 [端能力描述表zip生成](../接入步骤说明/端能力描述生成.md)

```
/**
 * @brief 获取端能力描述表需要存放的完整路径
 * @return 返回端能力描述表存放的完整路径
 */
+ (NSString *)pluginDescriptionPath;

```

@optional


* 自定义UA - 配置参考1.4备注
  
```
/**
 * @brief 自定义UA，不带webview信息，可以根据需要自行扩展
 *
 * @return NSString，自定义UA
 */
+ (NSString *)commonUserAgent;

```

```
/**
 * @brief webView UA navigator.userAgent
 *
 * @return NSString，webView UA
 */
+ (NSString *)webViewUserAgent;

/**
 * @brief 获取预置extension包文件的完整路径，要求文件格式是zip
 * @return 返回预置extension包的完整路径
 */
+ (NSString *)presetExtensionPackageBundlePath;

/**
 * @brief 获取预置extension包版本号
 * @return 返回预置extension包版本号
 */
+ (NSString *)presetExtensionPackageVersion;

/**
 * @brief 获取预置小程序/小游戏包的完整文件夹路径
 * @return 返回预置小程序/小游戏包的完整文件夹路径
 */
+ (NSString *)presetSmartAppRootPath;

#pragma mark - life cycle (小程序&小游戏生命周期)

/**
 * @brief 小程序&小游戏初始化入口
 *
 */
+ (void)initLifeCycle;

/**
 * @brief 当前小程序&小游戏进入前台
 *
 * @param appKey 小程序&小游戏的appKey
 */
+ (void)onLifeCycleForeground:(NSString *)appKey;

/**
 * @brief 当前小程序&小游戏进入后台
 *
 * @param appKey 小程序&小游戏的appKey
 */
+ (void)onLifeCycleBackground:(NSString *)appKey;

/**
 * @brief 当前小程序&小游戏加载失败
 *
 * @param error 失败信息
 * @param handler 宿主方回调决定是否使用小程序默认错误页面. 如果不回调, 默认为YES
 */
+ (void)onLifeCycleFailed:(NSError *)error handler:(void (^)(BOOL shouldUseSwanErrorUI))handler;

/**
 * @brief private:仅手百可用；构造屏蔽小程序的校验码
 * @param appKey 小程序&小游戏的appKey
 */
+ (NSString *)createExternalCheckCodeByAppKey:(NSString *)appKey;

```

### 1.3.3 示例
参考：BBASMPlatformImplement

## 1.4. 备注

<font color="#FF0000">**重要提示-微信H5支付**</font>
   
-------
**如果宿主接入的小程序要使用微信h5支付,需要在自定义UA里配置在微信开发者平台里设置的打开宿主app的协议头，否则支付完成或者取消的时候会跳转到safari浏览器，不能返回到宿主app。**

> 例如:

* 1、百度APP在微信开发者平台配置的协议头是`baiduboxapp`，此方法的返回值必须包含`baiduboxapp`

```
+ (NSString *)commonUserAgent{
   return @"baiduboxapp/11.2.0.0"
}
```
* 2、地图APP在微信开发者平台配置的协议头是`baidumap`，此方法的返回值必须包含`baidumap`

```
+ (NSString *)commonUserAgent{
   return @"baidumap"
}

```

<!-- TOC -->

- [1. Platform](#1-platform)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 实现BBAMNPPlatformProtocol接口](#131-实现bbamnpplatformprotocol接口)
            - [1.3.1.1. 接口方法列表](#1311-接口方法列表)
            - [1.3.1.2. 示例](#1312-示例)

<!-- /TOC -->
# 1. Platform
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-15|初始版本|

--------------------------
## 1.2. 功能说明
配置小程序框架运行环境的参数
## 1.3. 开发指南
### 1.3.1. 实现BBAMNPPlatformProtocol接口
#### 1.3.1.1. 接口方法列表

* 宿主版本CFBundleVersion

```
/**
 * @brief 宿主版本CFBundleVersion；
 *
 * @return NSString，宿主版本号，四位
 */
+ (NSString *)hostVersion;
```
* 宿主app名字

```
/**
 * @brief 宿主app名字，要求使用英文字符 （swanCore中的UA、请求公参）
 *
 * @return NSString，宿主app名字
 */
+ (NSString *)hostName;
```
* 程序/小游戏端能力协议头

```
/**
 * @brief 协议头，小程序/小游戏端能力协议头，比如手百：baiduboxapp
 *        ！！！：schemeName与hostName可能不同
 * @return NSString，协议头
 */
+ (NSString *)schemeName;
```
* 用户字体大小设置

```
// 用户字体大小设置
+ (NSString *)globalFontSizeLevel;
```
 * mtj的唯一标识
 
```
/// mtj的唯一标识
+ (NSString *)mtjCUID;
```
* 获取设备唯一标识

```
/// 获取设备唯一标识，pms请求服务必传
+ (NSString *)getDeviceIdentity;
```
* 当前网络状态；

```
/**
 * @brief 当前网络状态；
 *
 * @return NSString，value：Unknown（默认）、WiFi、2G、3G、4G
 */
+ (NSString *)currentNetworkTypeString;
```
* 设置小程序包加密公钥

```
/**
 * @brief 设置小程序包加密公钥；
 *
 * @return NSString，宿主方需要向百度平台申请公钥KEY
 */
+ (NSString *)swanPackagePublicKey;
```
* 指定宿主对extension版本号的支持规则

```
/**
 * @brief 指定宿主对extension版本号的支持规则
 *
 * @return NSString，extensino版本号的支持规则
 */
+ (NSString *)extensionRule;
```
* 注册端能力的自定义实现

```
/// 注册端能力的自定义实现
+ (void)registerDispatcherModuleActionsImplementation;
```
* 自定义UA

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

-------


```

/**
 * @brief 自定义UA，不带webview信息，可以根据需要自行扩展
 *
 * @return NSString，自定义UA
 */
+ (NSString *)commonUserAgent;
```
* 获取预置swan extension包文件的完整路径

```
/**
 * @brief 获取预置swan extension包文件的完整路径，要求文件格式是zip
 * @return 返回预置swan extension包的完整路径
 */
+ (NSString *)presetSwanExtensionPackageBundlePath;
```

* 获取预置swan extension包版本号

```
/**
 * @brief 获取预置swan extension包版本号
 * @return 返回预置swan extension包版本号
 */
+ (NSString *)presetSwanExtensionPackageVersion;
```
* 启动依赖服务

```
/**
 * @brief 将启动小程序依赖的服务放在这里面，如地图服务
 *
 */
+ (void)startService;
```
#### 1.3.1.2. 示例
```
#define BBAMNPSDKVersion @"1.7"
#define BBAMNPAppName @"baiduboxapp"

/**
 * 小程序包加密公钥key
 */
static NSString * const kSmallAppPublicKEY = @"your key";
static NSString * const kExtensionRule = @"~1.0.0";

+ (NSString *)hostVersion {
    return [NSBundle bbaBundleVersion];
}

+ (NSString *)hostName {
    return BBAMNPAppName;
}

+ (NSString *)schemeName {
    return BBAMNPAppName;
}

+ (NSString *)globalFontSizeLevel {
    Class<BBAUserSettingServiceProtocol> userSettingService = [Pyramid createClassService:@protocol(BBAUserSettingServiceProtocol)];
    if (userSettingService) {
        NSString *fontSizeLevel = [userSettingService globalFontSizeLevel];
        return fontSizeLevel;
    }
    return nil;
}

+ (NSString *)mtjCUID {
    BaiduMobStat *statTracker = [BaiduMobStat defaultStat];
    return [statTracker getDeviceCuid];
}

+ (NSString *)getDeviceIdentity {
    return [BBACuidSDK cuid];
}

+ (NSString *)currentNetworkTypeString {
    return [BBABoxDynamicParameters currentNetworkTypeString];
}

+ (NSString *)swanPackagePublicKey {
    return kSmallAppPublicKEY;
}

+ (NSString *)extensionRule {
    return kExtensionRule;
}

+ (void)registerDispatcherModuleActionsImplementation{
    // 归属到swan
    [BBASchemeDispatcher registerRedirectModule:@"utils" action:@"getIdfa" toModule:@"swan" toAction:@"getIdfa"];
    [BBASchemeDispatcher registerRedirectModule:@"utils" action:@"getCommonSysInfoSync" toModule:@"swan" toAction:@"getCommonSysInfoSync"];
}

+ (NSString *)presetSwanExtensionPackageBundlePath {
    NSString *extensionPath = [[NSBundle mainBundle] pathForResource:@"BBAMNPPyramid.bundle" ofType:nil];
    NSString *extensionPackagePath = [NSString stringWithFormat:@"%@/swan-core-extension.zip", extensionPath];
    if (!extensionPath) {
        return nil;
    }
    return extensionPackagePath;
}

+ (NSString *)presetSwanExtensionPackageVersion {
    NSString *extensionPath = [[NSBundle mainBundle] pathForResource:@"BBAMNPPyramid.bundle" ofType:nil];
    NSString *extensionConfigPath = [NSString stringWithFormat:@"%@/swan-extension-config.json", extensionPath];
    if (!extensionPath || !extensionConfigPath) {
        return nil;
    }
    NSData *extensionConfigData = [NSData dataWithContentsOfFile:extensionConfigPath];
    NSDictionary *presetExtConDic = [NSJSONSerialization JSONObjectWithData:extensionConfigData
                                                                    options:0
                                                                      error:nil];
    if (presetExtConDic) {
        return presetExtConDic[@"swan-core-extension-version"];
    }
    return nil;
}

+ (void)startService {
    [BBAMapKitManager start];
}

```


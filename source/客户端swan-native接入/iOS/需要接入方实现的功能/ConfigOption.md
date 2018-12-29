<!-- TOC -->

- [1. ConfigOption](#1-configoption)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. ConfigOption
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-17|初始版本|

--------------------------
## 1.2. 功能说明
* 小程序框架的配置选项接口，通过接口宿主可以配置debug模式是否开启https请求校验、直播鉴权等
* 配置项列表SWANConfigOption

```
#pragma mark - 开关配置 - BOOL 类型
/**
 开关配置 - BOOL 类型
 */
@interface SWANConfigOption()
///是否延时预加载下一个框架 默认值：YES
@property (nonatomic, assign) BOOL delayPreloadSwanFrame;

///是否禁用本地包 默认值：NO
@property (nonatomic, assign) BOOL disableLocalPackage;

/// getLocalImgData端能力是否要支持bdfile协议 默认值：YES
@property (nonatomic, assign) BOOL imgSrcFromBdfileEnable;

///是否延时后台更新当前小程序 默认值：YES
@property (nonatomic, assign) BOOL delayUpdatePackageSilent;

///网络请求端能力是否允许http请求 默认值:NO
@property (nonatomic, assign) BOOL netAbilityAllowHttpRequest;

///直播组件是否需要鉴权 默认值YES
@property (nonatomic, assign) BOOL liveNeedAuthorize;

/// debug模式可跳过域名校验 默认值：NO
@property (nonatomic, assign) BOOL ignoreDomainCheck;

/// 是否使用新的解压缩策略，默认值：YES
@property (nonatomic, assign) BOOL isUseNewUnzipPolicy;

/// master是否使用JSCore, 默认值：NO
@property (nonatomic, assign) BOOL masterUsingJSCore;

/// 是否在预加载时不重新开始，默认值：YES
@property (nonatomic, assign) BOOL mnpisPreloadNotRestart;

/// pms 是否开启, 默认值: NO
@property (nonatomic, assign) BOOL pmsEnable;

@end

#pragma mark - 值配置-number类型
/**
 值配置-number类型
 */
@interface SWANConfigOption()

///navigateTo最大层数 默认值：5
@property (nonatomic, assign) NSInteger maxNaviGateStack;

///白屏最长时间 默认值：6
@property (nonatomic, assign) NSInteger maxWhiteScreenTime;

/// 域名校验配置 默认值 SWANDomainCheckOpenAllCheck
@property (nonatomic, assign) SWANDomainCheckType domainCheck;

@end
```

## 1.3. 开发指南
* 实现接口SWANConfigOptionProtocol

```
@protocol SWANConfigOptionProtocol <NSObject>

@optional
/**
 返回配置参数对象 默认值为[SWANConfigOption defaultConfigOption]

@return 返回配置参数对象
*/
+ (SWANConfigOption *)configOption;
```
* 示例

```
#define SWANConfigOptionImplementDefault SWANConfigOption.defaultConfigOption

@implementation SWANConfigOptionImplement

mnp_registerAdapter(SWANConfigOptionImplement)

+ (SWANConfigOption *)configOption{
    SWANConfigOption *config = SWANConfigOptionImplementDefault;
    config.maxWhiteScreenTime = [self maxWhiteScreenTime];
    config.disableLocalPackage = [self disableLocalPackage];
    config.delayUpdatePackageSilent = [self isDelayUpdatePackageSilent];
    config.maxNaviGateStack = [self maxNavigateStackNum];
    config.imgSrcFromBdfileEnable = [self imgSrcFromBdfileEnable];
    config.delayPreloadSwanFrame = [self isDelayPreloadSwanFrame];
    config.domainCheck = [self urlDomainsCheck];
    config.isUseNewUnzipPolicy = [self isUseNewUnzipPolicy];
    config.masterUsingJSCore = [self masterUsingJSCore];
    config.mnpisPreloadNotRestart = [self mnpisPreloadNotRestart];
    config.pmsEnable = [self pmsEnable];
#ifdef _DEBUGMENU
    config.netAbilityAllowHttpRequest = [self netAbilityAllowHttpRequest];
    config.liveNeedAuthorize = [self liveNeedAuthorize];
    config.ignoreDomainCheck = [self ignoreDomainCheck];
    
    SWANDebugModeDownloaderType downloaderType = [[BBADebugMode readValueWithKey:kSWANDebugDownloaderTypeKey] integerValue];
    if (downloaderType == SWANDebugModeDownloaderTypeAPS) {
        config.pmsEnable = NO;
    } else if (downloaderType == SWANDebugModeDownloaderTypePMS) {
        config.pmsEnable = YES;
    }
#endif
    return config;
}

```



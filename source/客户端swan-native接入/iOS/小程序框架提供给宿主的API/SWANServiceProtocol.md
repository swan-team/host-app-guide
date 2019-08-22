<!-- TOC -->

- [1. SWANServiceProtocol](#1-SWANserviceprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANServiceProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 小程序框架相关


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
  Pyramid.bba_MNP
```
* 2、调用方法

```
[Pyramid.bba_MNP getFavorList]
```
* 3、方法列表

```
/// 根据appId删除小程序硬盘缓存
+ (void)removeLocalServiceForAppId:(NSString *)appId;
/// 删除全部小程序硬盘缓存
+ (void)removeAllLocalServices;
/// 获取当前小程序的场景值
+ (NSString*)getSenceVaule;
/// 获取当前小程序的app id
+ (NSString*)currentSwanAppId;

/// 添加信息日志--非页面切换
+ (void)addInfoLog:(NSString *)content module:(NSString *)module action:(NSString *)action;
/// 重置授权
+ (void)resetServiceAuthorizeRecordWithIDs:(NSArray *)appIDs;
/// 清除本地缓存的授权信息
+ (void)removeLocalAuthorizeInfoWithAppID:(NSString *)appID;

/// 删除缓存时删除授权所有数据
+ (void)removeAllAuthorizeInfo;

/// 获取小程序的运行log
+ (NSDictionary *)getSwanTrace;

/// 打开微信支付H5页面
+ (BOOL)openWeChatRequestUrl:(BBASchemeDispatcher *)dispatcher withCallback:(weChatPayCallback)callback;

/// 发送调起支付的UBC打点信息
+ (void)sendWalletUBCMessage:(NSDictionary *)dictionary
                       appId:(NSString *)appId;

/// 是小程序的scheme
+ (BOOL)isLaunchMNP:(NSString *)scheme;

/// 预加载swancore接口
+ (void)preloadSwanCore:(SWANSCPreloadScene)scene;

/// 小程序功能是否可用 支持最低版本的系统为iOS9
+ (BOOL)enableMNP;

/**
 * @brief 根据appId返回app类型的string
 *
 * @return 小程序返回swan，小游戏返回swangame，其他返回unknown
 */
+ (NSString *)appTypeString:(NSString *)appId;

/// 尝试静默更新
+ (void)trySilentUpdate;
/// 预下载小程序业务包
+ (void)preDownloadAppPackageWithAppID:(NSString *)appID callBack:(void(^)(BOOL succeed))callBack;
/// 取消预下载小程序包
+ (void)cancelPreDownloadAppPackageWithAppID:(NSString *)appID;
/// 小程序是否已经下载了
+ (BOOL)appHasPrefetchedWithAppID:(NSString *)appID;

/// 当前小程序/小游戏最顶层的VC
+ (UIViewController *)topViewController;


/**
 * @brief 收藏我的小程序
 * @param appid 被收藏的小程序的appid
 * @return  是否执行成功
 */
+ (BOOL)addFavorWithAppid:(NSString *)appid;

/**
 * @brief 移除我的小程序
 * @param appid 被移除的小程序的appid
 * @return  是否执行成功
 */
+ (BOOL)deleteFavorWithAppid:(NSString *)appid;

/**
 * @brief 将小程序移动至最前面
 * @param appid 被移动的小程序的appid
 * @return  是否执行成功
 */
+ (BOOL)topFavorWithAppid:(NSString *)appid;

/**
 * @brief 当前小程序是否已经被收藏
 * @param appid 小程序的appid
 * @return 是否已经被收藏
 */
+ (BOOL)isFavorWithAppid:(NSString *)appid;

/**
 * @brief 获取我的小程序列表
 *
 * @return 小程序列表
 */
+ (NSArray *)getFavorList;

/**
 * @brief 删除指定小程序历史
 * @param appid 待删除小程序的appid
 * @return  是否执行成功
 */
+ (BOOL)deleteHistoryWithAppid:(NSString *)appid;

/**
 * @brief 删除所有小程序历史
 *
 * @return  是否执行成功
 */
+ (BOOL)deleteAllHistory;

/**
 * @brief 获取小程序历史数据
 *
 * @return 历史数据列表
 */
+ (NSArray *)getHistoryList;

/**
 * @brief 获取小程序历史数据
 * @param from 来源值
 * @return 历史数据列表
 */
+ (NSArray *)getHistoryListWithFromId:(NSString *)from;

/**
 * @brief 根据指定参数获取小程序/小游戏scheme
 * @param appId 小程序id
 * @param frameType 小程序类型
 * @param from 小程序来源
 * @return scheme
 */
+ (NSString *)generateMNPSchemeByAppid:(NSString *)appId
                             frameType:(NSString *)frameType
                                  from:(NSString *)from;
/// 到达率打点
+ (void)mnpEntranceStatistics:(NSString *)shemeUrl
                   sourceFrom:(NSString *)sourceFrom;

/**
 * @brief 打开评价页面
 *
 */
+ (void)openEvaluateSwanViewController;


#ifdef _DEBUGMENU

// debug ViewController
+ (UIViewController *)debugRootViewController;

#endif
```



<!-- TOC -->

- [1. SWANSubDirectoryManagerProtocol](#1-SWANsubdirectorymanagerprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANSubDirectoryManagerProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 文件和文件夹操作


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
  Pyramid.bba_MNPSubDirectoryManager
```
* 2、调用方法

```
[Pyramid.bba_MNPSubDirectoryManager swapSubDirectoryPath:appID directory:SWANSubDirectoryTmp]
```
* 3、方法列表

```
/**
 * 返回小程序appId
 */
+(NSString *)swapAppId:(BBASchemeDispatcher *)dispatcher;

/**
 * 返回小程序沙盒子文件夹目录
 * 参数：appId
 directory，枚举值，目前有四个子文件夹
 */
+(NSString *)swapSubDirectoryPath:(NSString *)appId
                        directory:(SWANSubDirectoryName)directory;

/**
 * 将小程序相对路径转为绝对路径 例：前端传过来的文件名，转为绝对路径
 */
+(NSString *)inverseFileNameToDefinatePath:(NSString *)fileName
                                     appId:(NSString *)appId;

/**
 * 文件路径转为文件名
 * 参数path: 可以是相对路径，也可以是绝对路径
 * 返回值：js需要的文件名，以bdfile开头
 */
+(NSString *)fileNameByPath:(NSString *)path
                   andAppId:(NSString *)appId;

#pragma mark - 文件管理的方法
/**
 * 创建所有文件夹
 */
+(void)createAllSubDirectoryByAppId:(NSString *)appId;

/*
 * 读写操作在下面的队列里面执行。
 * action:要做的读写操作
 * completion: 读写完成回调
 */
+(void)readWriteOnMnpIOQueue:(void (^)(void))action completion:(void (^)(void))completion;

/**
 * 清理文件夹
 * 参数：
 * time: 文件的过期时间
 * maxSize: 文件最大的缓存量 单位字节
 */
+(void)cleanDirectory:(NSString *)directoryPath expireTime:(NSTimeInterval)time andMaxSize:(double)maxSize;

///小程序即将退出
+(void)swanWillEnterBackground:(NSString *)appId;

/**
 * 清除指定小程序的tmp目录
 */
+(void)cleanTmpDir:(NSString *)appId;
```
  
  



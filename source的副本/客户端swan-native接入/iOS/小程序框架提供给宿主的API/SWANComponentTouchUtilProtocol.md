<!-- TOC -->

- [1. SWANComponentTouchUtilProtocol](#1-SWANcomponenttouchutilprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANComponentTouchUtilProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 组件事件派发


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
  Pyramid.bba_MNPTouchUtil
```
* 2、调用方法

```
[Pyramid.bba_MNPTouchUtil triggerEvent:eType
                                     appId:[Pyramid.bba_MNPUtilities currentAppID:dispatcher]
                                   slaveId:slaveId componentId:cameraId
                             componentName:@"ARCamera"
                                      data:data]
                                      
```
* 3、方法列表

```
/**
 touch 事件派发
 
 @param name 事件名称
 @param timestamp 时间戳
 @param all 触摸点的集合
 @param changed 当前停留在屏幕中的触摸点信息的数组
 @param remaining 触摸点的集合 = all （迁移自canvas 重复参数 需要删除）
 @param appId 小程序id
 @param slaveId webView id
 @param componentId 组件id
 @param componentName 组件名称
 @return 生成的js代码
 */
+ (NSString *)triggerEvent:(NSString *)name
                 timestamp:(NSTimeInterval)timestamp
                       all:(NSSet *)all
                   changed:(NSSet *)changed
                 remaining:(NSSet *)remaining
                     appId:(NSString *)appId
                   slaveId:(NSString *)slaveId
               componentId:(NSString *)componentId
             componentName:(NSString *)componentName;

/**
 自定义事件派发
 
 @param name 事件名称
 @param appId 小程序id
 @param slaveId webView id
 @param componentId 组件id
 @param componentName 组件名称
 @param data 业务数据
 @return 生成的js代码
 */
+ (NSString *)triggerEvent:(NSString *)name
                     appId:(NSString *)appId
                   slaveId:(NSString *)slaveId
               componentId:(NSString *)componentId
             componentName:(NSString *)componentName
                      data:(NSDictionary *)data;

/**
 生成js 函数
 
 @param slaveId webView id
 @param componentId 组件id
 @param eventName 事件名称
 @param componentName 组件名称
 @param data 业务数据
 @return 生成的js代码
 */
+ (NSString*)scriptFormatBySlaveId:(NSString*)slaveId
                       componentId:(NSString*)componentId
                         eventName:(NSString*)eventName
                     componentName:(NSString*)componentName
                              data:(NSDictionary*)data;                           
```
  



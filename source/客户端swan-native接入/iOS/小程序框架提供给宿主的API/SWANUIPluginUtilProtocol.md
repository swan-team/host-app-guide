<!-- TOC -->

- [1. SWANUIPluginUtilProtocol](#1-SWANuipluginutilprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANUIPluginUtilProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 组件添加容器视图


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
Pyramid.bba_MNPUIPluginUtil
```

* 2、调用方法

```
[Pyramid.bba_MNPUIPluginUtil getComponentViewWithDispatcher:dispatcher
                                                                                  viewId:arCameraID]
```
* 3、方法列表

```
/**
 * @brief 通过viewIdKey，获取组件
 *
 * @param dispatcher 协议
 * @param viewId 获取viewId 对应的Key
 * @return 组件
 */
+ (UIView *)getComponentViewWithDispatcher:(BBASchemeDispatcher *)dispatcher
                                    viewId:(NSString *)viewId;

/**
 * @brief 给当前组件添加容器视图
 *
 * @param dispatcher 协议
 * @param componentView 组件
 * @param compIdKey 组件id
 * @param compName 组件名称
 * @return 容器视图
 */
+ (UIView *)addComponentViewWithDispatcher:(BBASchemeDispatcher *)dispatcher
                             componentView:(UIView *)componentView
                                 compIdKey:(NSString *)compIdKey
                                  compName:(NSString *)compName;
/**
 * @brief 移除组件
 *
 * @param componentView 组件
 */
+ (void)removeComponentView:(UIView *)componentView;

/**
 * @brief 更新组件
 *
 * @param componentView 组件
 * @param dispatcher 协议
 */
+ (void)updateComponentView:(UIView *)componentView
             withDispatcher:(BBASchemeDispatcher *)dispatcher;
```
  
  



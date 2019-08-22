<!-- TOC -->

- [1. SWANDialogProtocol](#1-SWANdialogprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANDialogProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 弹对话框


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
  Pyramid.bba_MNPDialog
```

* 2、调用方法

```
[Pyramid.bba_MNPDialog showWithTitle:title
                                 titleColor:nil
                                contentInfo:content
                               contentColor:nil
                                buttonItems:buttonItems
                                      appID:command.userInfo[kSWANDispatcherUserInfoAPPIDKey]];
```
* 3、方法列表
  
  ```
  + (void)showWithTitle:(NSString *)title
                   titleColor:(NSString *)titleColor
                  contentInfo:(NSString *)contentInfo
                 contentColor:(NSString *)contentColor
                  buttonItems:(NSArray<BBADialogButtonItem *> *)buttonItems
                        appID:(NSString *)appID;
  ```



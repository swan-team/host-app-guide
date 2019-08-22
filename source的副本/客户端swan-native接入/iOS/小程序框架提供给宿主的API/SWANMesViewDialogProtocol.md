<!-- TOC -->

- [1. SWANMesViewDialogProtocol](#1-SWANmesviewdialogprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. SWANMesViewDialogProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 弹Alert、Toast


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
  Pyramid.bba_Mnp
```
* 2、调用方法

```
[Pyramid.bba_Mnp showWithTipImage:[UIImage imageNamed:@"comic_dialog_guide"]
                                  showClose:self.showCloseSwitch.on
                                 closeBlock:nil];
```
* 3、方法列表

```
+ (void)showWithTipImage:(UIImage *)image
               showClose:(BOOL)showClose
              closeBlock:(void(^)(void))closeBlock
                   appID:(NSString *)appID;

+ (void)showWithTipImage:(UIImage *)image
         imageClickBlock:(BOOL(^)(void))clickBlock
               showClose:(BOOL)showClose
              closeBlock:(void(^)(void))closeBlock
                   appID:(NSString *)appID;


+ (void)showWithTipCustomView:(UIView *)tipCustomView
                    showClose:(BOOL)showClose
                   closeBlock:(void(^)(void))closeBlock
                        appID:(NSString *)appID;


+ (void)showWithTitle:(NSString *)title
          contentInfo:(NSString *)contentInfo
          buttonItems:(NSArray<BBADialogButtonItem *> *)buttonItems
                appID:(NSString *)appID;

+ (void)showWithTitle:(NSString *)title
           titleColor:(NSString *)titleColor
          contentInfo:(NSString *)contentInfo
         contentColor:(NSString *)contentColor
          buttonItems:(NSArray<BBADialogButtonItem *> *)buttonItems
                AppID:(NSString *)appID;



+ (void)showWithItems:(NSArray<BBADialogItem *> *)items
                AppID:(NSString *)appID;


+ (void)showWithItems:(NSArray<BBADialogItem *> *)items
           configItem:(BBADialogConfigItem *)configItem
    showAnimationType:(BBADialogShowAnimationType)showAnimationType
                AppID:(NSString *)appID;

+ (void)showToast:(NSString *)message
            appid:(NSString *)appID;

+ (void)showToast:(NSString *)message
            style:(BBAMessageToastStyle)style
            appid:(NSString *)appID;

+ (void)showToast:(NSString *)message
            style:(BBAMessageToastStyle)style
            image:(UIImage *)image
       parentView:(UIView *)parentView
           offset:(CGPoint)offset
         duration:(NSTimeInterval)duration
         callback:(CallbackBlock)callback
            appid:(NSString *)appID;

+ (void)showToast:(NSString *)message
            title:(NSString *)title
       buttonText:(NSString *)buttonText
            image:(UIImage *)image
         imageUrl:(NSString *)imageUrl
       parentView:(UIView *)parentView
            style:(BBAMessageToastStyle)style
           offset:(CGPoint)offset
         duration:(NSTimeInterval)duration
         callback:(dispatch_block_t)callback
            appid:(NSString *)appID;

+ (void)showToast:(NSString *)message
            title:(NSString *)title
       buttonText:(NSString *)buttonText
            image:(UIImage *)image
         imageUrl:(NSString *)imageUrl
       parentView:(UIView *)parentView
            style:(BBAMessageToastStyle)style
           offset:(CGPoint)offset
         duration:(NSTimeInterval)duration
    isMultiButton:(BOOL)isMulti
         callback:(MultiButtonCallBack)callback
            appid:(NSString *)appID;
```



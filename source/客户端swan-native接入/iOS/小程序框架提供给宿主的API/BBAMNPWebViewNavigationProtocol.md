<!-- TOC -->

- [1. BBAMNPWebViewNavigationProtocol](#1-bbamnpwebviewnavigationprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. BBAMNPWebViewNavigationProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* WebViewNavigation


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
Pyramid.bba_MNPWebViewNavigation
```
* 2、调用方法

```
 [Pyramid.bba_MNPWebViewNavigation resetWebViewOffsetYZero:self.webView];
```
* 3、方法列表

```
/**
 判断是否是appStore url
 
 @param urlString a urlString
 @return YES 是
 */
+ (BOOL)isAppStoreUrlString:(NSString*)urlString;

/**
 * @brief 重置WKWebView的滚动位置,侧滑退出滚动位置负数,恢复正常
 *
 * @param observerWebView 页面的 webview
 */
+ (void)resetWebViewOffsetYZero:(WKWebView*)observerWebView;

/**
 重置scrollView的滚动位置,侧滑退出滚动位置负数,恢复正常
 
 @param scrollView a scrollView
 */
+ (void)resetScrollViewOffsetYZero:(UIScrollView *)scrollView;
```



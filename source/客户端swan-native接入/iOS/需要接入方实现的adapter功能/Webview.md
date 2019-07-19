- [1. 菜单栏](#1-菜单栏)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
        - [1.2.1. 功能说明](#121-功能说明)
        - [1.2.2. 设计原理](#122-设计原理)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 协议](#131-协议)
        - [1.3.2. 接口列表](#132-接口列表)
        - [1.3.3. 示例](#133-示例)    
<!-- /TOC -->

# 1. WebView
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-13|初始版本|
|2.7.0|2019-06-17|Adapter协议优化|

--------------------------
## 1.2. 功能说明

### 1.2.1. 功能说明

小程序框架提供的框架相关webview的生命周期事件方法，宿主可以在对应的方法中添加自有逻辑。(此协议中的方法均为非必须实现)

### 1.2.2. 设计原理

+ 在框架内部的webview加载完成或析构的时候，调用**BBASMWebViewAdapterProtocol**中的协议方法，宿主如果实现了相关协议方法就可以在其中添加自有逻辑。
+ 目前共有5中类型的webview，其中包括：masterWebView、slaveWebView、consoleWebView、adWebView、webViewComponent。具体webview的意义请翻阅小程序框架文档。

 
## 1.3. 开发指南

### 1.3.1. 协议
BBASMWebViewAdapterProtocol

### 1.3.1. 接口列表

```
/**
 * @brief 初始化webView配置
 *
 * @param webView 要配置的webView
 */
+ (void)webViewDidLoad:(WKWebView *)webView;
```


```
/**
 * @brief webView dealloc回调方法
 *
 * @param webView 要销毁的webView
 */
+ (void)webViewWillDealloc:(WKWebView *)webView;
```


```
/**
 @brief 返回一个全局的processPool

 @return 一个全局的processPool
 */
+ (WKProcessPool *)globalProcessPool;
```

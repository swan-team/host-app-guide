<!-- TOC -->

- [1. BBAMNPWebViewProtocol](#1-bbamnpwebviewprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
        - [1.2.1. 功能说明](#121-功能说明)
        - [1.2.2. 设计原理](#122-设计原理)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. masterWebView加载完成](#131-masterwebview加载完成)
        - [1.3.2. masterWebView析构](#132-masterwebview析构)
        - [1.3.3. slaveWebView加载完成](#133-slavewebview加载完成)
        - [1.3.4. slaveWebView析构](#134-slavewebview析构)
        - [1.3.5. consoleWebView加载完成](#135-consolewebview加载完成)
        - [1.3.6. consoleWebView析构](#136-consolewebview析构)
        - [1.3.7. webViewComponent加载完成](#137-webviewcomponent加载完成)
        - [1.3.8. webViewComponent析构](#138-webviewcomponent析构)
        - [1.3.9. adWebView加载完成](#139-adwebview加载完成)
        - [1.3.10. adWebView析构](#1310-adwebview析构)
        - [1.3.11. 同步cookie](#1311-同步cookie)

<!-- /TOC -->
# 1. BBAMNPWebViewProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-13|初始版本|

--------------------------
## 1.2. 功能说明


### 1.2.1. 功能说明

小程序框架提供的框架相关webview的生命周期事件方法，宿主可以在对应的方法中添加自有逻辑。(此协议中的方法均为非必须实现)

### 1.2.2. 设计原理

+ 在框架内部的webview加载完成或析构的时候，调用**BBAMNPWebViewProtocol**中的协议方法，宿主如果实现了相关协议方法就可以在其中添加自有逻辑。
+ 目前共有5中类型的webview，其中包括：masterWebView、slaveWebView、consoleWebView、adWebView、webViewComponent。具体webview的意义请翻阅小程序框架文档。

 
## 1.3. 开发指南

### 1.3.1. masterWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)masterWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.2. masterWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)masterWebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.3. slaveWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)slaveWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.4. slaveWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)slaveWebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.5. consoleWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)consoleWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.6. consoleWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)consoleWebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.7. webViewComponent加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)webViewComponentDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.8. webViewComponent析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)webViewComponentWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.9. adWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)adWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```


### 1.3.10. adWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)adwebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 1.3.11. 同步cookie

slaveWebView触发**webView:decidePolicyForNavigationResponse:decisionHandler:**方法时会触发此方法，宿主可在此方法中做保存cookie的操作。

```
+ (void)syncHttpCookieStorage;
```

## 功能说明

小程序框架提供的框架相关webview的生命周期事件方法，宿主可以在对应的方法中添加自有逻辑。(此协议中的方法均为非必须实现)

## 设计原理

+ 在框架内部的webview加载完成或析构的时候，调用**BBAMNPWebViewProtocol**中的协议方法，宿主如果实现了相关协议方法就可以在其中添加自有逻辑。
+ 目前共有5中类型的webview，其中包括：masterWebView、slaveWebView、consoleWebView、adWebView、webViewComponent。具体webview的意义请翻阅小程序框架文档。

 
## 接口设计

### 1.masterWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)masterWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 2.masterWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)masterWebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 3.slaveWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)slaveWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 4.slaveWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)slaveWebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 5.consoleWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)consoleWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 6.consoleWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)consoleWebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 7.webViewComponent加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)webViewComponentDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 8.webViewComponent析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)webViewComponentWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 9.adWebView加载完成

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)adWebViewDidLoad:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```


### 9.adWebView析构

```
/*
 * @params webView 发送事件的webView
 * @params configuration webView的初始化信息
 *
 */
+ (void)adwebViewWillDealloc:(WKWebView *)webView configuration:(WKWebViewConfiguration *)configuration;
```

### 10.同步cookie

slaveWebView触发**webView:decidePolicyForNavigationResponse:decisionHandler:**方法时会触发此方法，宿主可在此方法中做保存cookie的操作。

```
+ (void)syncHttpCookieStorage;
```


### 功能说明
+ 目前小程序内部一共分为<font color=red>2种网络请求</font>：
	- 1.仅用于宿主内部的私有网络请求，此网络请求不对小程序开发者开放，属于宿主自己的私有请求，一般用来请求宿主自己的Server，需要带上一些私有信息，如cookie等，比如账号登录、授权、包的下载、发票、收货地址等等。
	- 2.专门开放给小程序开发者使用的网络请求，如[网络请求](https://smartprogram.baidu.com/docs/develop/api/net_request/)，开发者自己可以配置链接的各种信息。
+ 针对第一种私有请求，是可以<font color=red>携带上Cookie信息</font>的，会在发送请求之前从ISwanAppCookie#createCookieManager方法自动使用cookie数据，宿主方需要自行实现自己的cookie规则，需要携带哪些数据。
+ 第二种，开放给小程序开发者使用的网络请求，处于安全考虑，是<font color=red>不携带cookie信息</font>的，小程序应用的开发者如果需要cookie，得自己在请求头里添加和获取，设计规范如此。
+ 注：<font color = red>这两种请求默认都是会携带上UA</font>，目前UA的默认格式为 `Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 swan/2.0.0 swan-baiduboxapp/10.12.0.0`，参考[UA规范](../../../规范说明/UA规则.md)，UA的设置在`SwanAppUserAgent.java`

### 设计原理
+ 在宿主私有网络请求每次发起之前，都会使用ISwanAppCookie#createCookieManager方法，创建一个cookie的管理器，这个管理器决定了上传cookie的规则。
+ 注：由于小程序是多进程框架，这个ISwanAppCookie#createCookieManager只会在小程序当前进程调用，如果需要所有小程序公用一份Cookie(比如大多数APK用户的账号信息cookie都是存储在主进程的)，需要实现跨进程通信的方式去主进程读写cookie。跨进程方式参考`DelegateUtils.java`，专门提供各种形式的跨进程通信。
 
### 接口设计
 + 一共只有1个接口需要实现
 + 接口都在 **ISwanAppCookie.java** 中。
 + 
 
 ```
	/**
     * 创建SwanAppCookieManager
     *
     * @return {@link SwanAppCookieManager}
     */
    SwanAppCookieManager createCookieManager();
    
   
   // SwanAppCookieManager 是标准的Cookie管理方式
   public abstract class SwanAppCookieManager implements CookieManager {

    @Override
    public boolean shouldAcceptCookie(String s, String s1) {
        return false;
    }

    @Override
    public boolean shouldSendCookie(String s, String s1) {
        return true;
    }

    @Override
    public void storeCookie(String s, List<String> list) {

    }

    @Override
    public abstract String getCookie(String s);
}
 ```


### 参考实现

+ 实现参考demo的/demo/src/main/java/com/baidu/swan/demo/swan/impl/cookie

# 小程序SDK对于UA的设计要求

## UA说明
先看一下在手百中的示例(以iOS为例)：
```html
Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 swan/2.0.0 swan-baiduboxapp/10.12.0.0
```
这里我们一起来看一下整个UA划分

### 系统UA
第一段是系统UA --  `Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217` 这块UA可以用作正常的iOS/Android的系统判断和浏览器判断。


### 小程序SDK标识
`swan/2.0.0 `该标识为swan-sdk本身的标识，前方是标识当前为swan的环境，紧随其后的是小程序SDK的三位版本号，如果有针对能力的判断，或者更新机制。请使用这个版本号进行判断。


### 宿主客户端标识
`swan-baiduboxapp/10.12.0.0`该表识为swan的宿主标识及宿主版本号标识，斜杠后面是宿主的版本号，对位数无要求。宿主的版本判断可以根据此字段。

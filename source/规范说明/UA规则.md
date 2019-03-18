# UA 规则
> 本节为您介绍宿主 App 在开发过程中需要遵守的 UA 规则，包括：系统UA、小程序SDK标识和宿主客户端标识三个部分。


首先以手百 iOS 为例分析完整的 UA 划分：

```html
Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 swan/2.0.0 swan-baiduboxapp/10.12.0.0
```

### 系统UA

    `Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217`

该部分 UA 可以用作正常的 iOS/Android 系统判断和浏览器判断。


### 小程序SDK标识

    `swan/2.0.0 `

该标识为 swan-sdk 本身的标识，前方是标识当前为 swan 的环境，后为小程序 SDK 的三位版本号。如果有针对能力的判断或者更新机制，请使用这个版本号进行判断。


### 宿主客户端标识

    `swan-baiduboxapp/10.12.0.0`

该标识为 swan 的宿主标识及宿主版本号标识，斜杠后面是宿主的版本号，对位数无要求。宿主的版本判断可以根据此字段。

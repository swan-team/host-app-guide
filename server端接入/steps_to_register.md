# 内部接入方接入流程

内部接入方如果对内部实现逻辑感兴趣，可以阅读 [外部开源接入方服务端实现建议](./advices_for_implement.md) 。本文档主要介绍百度系APP如果接入小程序。

百度系APP可以直接复用现有小程序现有OAuth逻辑，如果没有定制化需求，基本上是零开发的。

因为要复用现有的逻辑，所以需要如下参数：

```
"app_key":  "wFxG7nwxhmtGpAs32CQnSxUGKhX7QsgL",
"stoken":   "f811c5fc0025df86177b68749ca8dfa3958b0dc55b50eab896bb01fb70799a08",
"host_bundle_id": "",   // 百度官方iOS宿主端（如百度框）的Bundle ID 
"host_pkgname":   "",   // 百度官方Android宿主端（如百度框）的包名
"host_key_hash": "",    // 百度官方Android宿主端（如百度框）的keystore md5签名
"host_api_key": ""      // 宿主端的产品线的Api Key
```

这块如果本身有缺失的字段，需要申请。我们有专门的hi群： 1654889，进入即可。

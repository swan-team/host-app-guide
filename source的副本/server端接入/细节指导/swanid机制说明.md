
# swanid机制说明 

由于宿主应用并不一定强制用户登录，因此用户也有可能处于未登录状态。此时开发者可能不希望通过调用swan.login()强制用户登录，而是希望直接使用用户的设备标识来关联用户，存储一些非敏感的数据。因此智能小程序还提供一个SwanID的标识，可视作用户的设备标识。

用户在同一台设备上使用同一个开发者所开发的不同智能小程序，得到的是相同的SwanID。
用户在同一台设备上使用不同开发者所开发的不同智能小程序，得到的SwanID是不同的。

## 时序图

![图片](http://agroup-bos.cdn.bcebos.com/d67d445b466a9487c4420a647cfa4d506f0dc9eb)

说明：
1.小程序调用swan.getSwanid()请求宿主接口,宿主通过client_id(智能小程序的app key)查询对应开发者信息，用开发者信息&设备id生成swanid（同开发者在同一宿主生成唯一swanid）。
2.宿主通过appkey获取开发者信息，设备id和开发者信息结合生成swanid（生成方式推荐请见详细说明），从百度server获取swanid_signature。
3.宿主将生成的swanid和获取的swanid_signature一起返回。
4.小程序向开发者发起请求时，开发者需要先校验swanid和swanid_signature是否有效，确认有效，再返回数据，signature计算方法请参照开发者文档。


## 接口

###1.通过swanid生成swanid_signature（百度server提供，宿主请求）

接口地址：https://spapi.baidu.com/ossapi/swanid/signature
请求方式：POST
请求说明：

|请求参数 | 数据类型 | 必填 | 说明 | 
|---|---|---|---|
|swanid | string | 是 | 宿主生成的swanid | 
|client_id | string | 是 | 智能小程序的app key | 
|timestamp | int64 | 是 | 时间戳，时间标准为 UTC，取当前请求时间(用于下游判断当前请求是否过期) | 
|sign | string | 是 | 签名详细说明 | 
|union_id | string | 是 | 宿主id | 
|sign_version | string | 是 | 签名版本（目前签名算法版本是0.0.1） | 



**签名算法：**

1.将请求参数按照字母先后顺序排列，注意参数中剔除 sign，例如将 swanid、client_id、timestamp、union_id、sign_version 排序为 client_id、sign_version、swanid、timestamp、union_id。

2.把所有参数名和参数值拼装起来 client_id=xxx&sign_version=xxx&swanid=xxx&timestamp=xxx&union_id=xxx
**（此签名算法sign_version=0.0.1）**

**3.将宿主密钥hsk拼接到签名字符串的最后面
使用md5进行加密**(sign=md5(client_id=xxx&sign_version=xxx&swanid=xxx&timestamp=xxx&union_id=xxx&hsk=xxx))


**返回说明：（JSON文本，包含以下数据）**

|返回参数 | 类型 | 说明 | 
|---|---|---|
|errno | int | 错误号，0-表示成功，其他表示失败 | 
|msg | string | 错误信息，成功为success | 
|request_id | string | 本次请求的标识 | 
|timestamp | int64 | 返回时间戳 | 
|data | object | 返回数据信息 | 
|data.swanid_signature | string | swanid signature | 


### 2.signature计算方法（开发者参考，进行校验）

https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#signature-计算方法/

### 3.生成swanid及signature接口（宿主server提供，小程序请求）

请求说明：
|请求参数 | 类型 | 是否必填 | 参数说明 | 
|---|---|---|---|
|client_id| string | 是 | 小程序 appKey | 
|swanid_id| string | 是 | 宿主生成的swanid| 

返回说明：（返回格式json／application）
|字段名 | 字段类型 | 说明 | 
|---|---|---|
|errno | int | 错误号，0-表示成功，其他表示失败 | 
|msg | string | 错误信息，成功时候为succ | 
|data | object | 返回的数据信息 | 
|data.swanid | string | swanid | 
|data.swanid_signature | string | swanid签名 | 
|request_id | string | 请求id,百度服务端signature接口返回 | 
|timestamp | int64 | 返回时间戳 | 

### swanid相关说明

1.要求：
1）长度不超过90，算法生成的swanid加前缀为最终swanid。
2）保证前缀正确，防止swanid碰撞。（百度保证，宿主需要找百度服务端分配前缀）前缀方案:H + 全部大写（oauth生成code后面加的host后缀）。
例如：爱奇艺是iqiyi，则前缀为HIQIYI。这个前缀一定要保证正确，百度会做判断。
3）保证swanid可以反解出他们自己的设备号，这样消息推送之类的功能可以触达到具体的设备。
4）swanid有一定的防伪造特征，给定一个swanid和对应的小程序appkey，开发者可以判断这个swanid是真是假。
2.参考swanid生成规则算法：推荐使用rsa（宿主也可以采用自己的方法生成swanid，只要符合1中规则即可）。
3.生成swanid参数：设备id，开发者标识（通过小程序client_id，即appkey拿到获取上级开发者数据，这部分数据已经由百度同步给宿主）









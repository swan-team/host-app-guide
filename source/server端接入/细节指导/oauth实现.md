# oauth实现

## 登陆时序图

![图片](http://agroup-bos.cdn.bcebos.com/7a2b74f0931f09c32aa5526b245e0cdc00090fb0)

说明：
1.小程序调用swan.login()请求宿主登陆接口，获取code
2.小程序请求百度server code2sessionkey接口，百度server发送client_id，code，sign 给宿主服务器，宿主服务端接口生成session_key, open_id返回给百度服务器，百度服务器作为请求返回给小程序。
3.小程序完成登陆，将数据存储在本地
4.小程序发起业务请求是携带登陆标识，开发者判断登陆身份和权限，返回数据。

## 接口梳理

#### 百度服务端接口

### 1.code转sessionkey接口

小程序请求，请见开发者文档
https://smartprogram.baidu.com/docs/develop/api/open_log/#Session-Key/

#### 宿主实现接口

### 1.login接口

返回说明：

|字段名 | 字段类型 | 说明 | 
|---|---|---|
|errno| int | 错误号，0-表示成功，其他表示失败 | 
|msg | string | 错误信息，成功时候为success | 
|data | object | 返回的数据信息 | 
|data.code | string |开发者上一阶段从宿主获取的 code （建议宿主将code用于保证有效时间内只有一次有效请求）code的格式：randStr@host/randStr 如果没有@host代表的是宿主是百度APP 如果没有@host代表的是宿主是百度APP 备注：每次请求，code只能用一次，超过一次就提示过期| 

### 2.通过code获取sessionkey接口

接口地址：由联盟宿主方提供，建议提供 https 协议的 URL 接口
请求方式：GET
请求说明：

|参数 | 数据类型 | 必填 | 说明 | 
|---|---|---|---|
|request_id | string |是 | 本次请求的标识 | 
|client_id | string |是 | 小程序 appKey | 
|code | string |是 | 开发者上一阶段从宿主获取的 code （建议宿主将code用于保证有效时间内只有一次有效请求）code的格式：randStr@host/randStr 如果没有@host代表的是宿主是百度APP 如果没有@host代表的是宿主是百度APP 备注：每次请求，code只能用一次，超过一次就提示过期|
|sign | string |是 | 签名详细说明| 
|timestamp | int64 |是 | 时间戳，时间标准为 UTC，取当前请求时间(用于下游判断当前请求是否过期)| 
|sign_version | string |是 | 签名版本（预留字段，不同签名版本可对应不同签名算法，为后续扩展做准备）| 

返回说明：
返回格式：application/json

|参数 | 数据类型 | 必填 | 说明 | 
|---|---|---|---|
|errno | int |是 | 错误号，0-表示成功，其他表示失败 | 
|errmsg | string |是 | 错误信息，成功时候为success |
|tipmsg | string |是 | 错误信息详情 |
|request_id | string |是 | 本次请求的标识(由百度给出，宿主方回传，用于问题定位) |
|timestamp | int64 |是 | 返回时时间戳 |
|data | object |是 | 返回的数据信息 |
|data.open_id | string |是 | 用户身份标识 |
|data.session_key | string |是 | session key |

返回示例：

```
{
    "errno": 0,
    "errmsg": "succ",
    "tipmsg": "response is ok",
    "requeset_id": "2564900132",
    "timestamp": 1544800165,
    "data": {
        "open_id": "xxx",
        "session_key": "xxx"
    }
}
```

**签名算法：**

 - 将请求参数按照字母先后顺序排列，注意参数中剔除 sign，例如将request_id、client_id、code、timestamp、sign_version 排序为client_id、code、request_id、sign_version、timestamp 
 - 把所有参数名和参数值拼装起来：client_id=xxx&code=xxx&request_id=xxx&sign_version=xxx&timestamp=xxx
 - 将宿主密钥hsk(从B端获取)拼接到签名字符串的最后面，使用md5进行加密(sign=md5(client_id=xxx&code=xxx&request_id=xxx&sign_version=xxx&timestamp=xxx&hsk=xxx))

### 3.checksessionkey

说明：用户登录态拥有一定的时效性，用户越久未使用智能小程序，用户登录态越有可能失效；反之如果用户一直在使用智能小程序，则用户登录态一直保持有效。具体时效逻辑由宿主维护，对开发者透明。
|参数 | 数据类型 | 必填 | 说明 | 
|---|---|---|---|
|errno | int |是 | 错误号，0-表示成功，其他表示失败 | 
|errmsg | string |是 | 错误信息，成功时候为success |
|data | object |是 | 返回的数据信息 |
|data.result | bool |是 | sessionkey是否有效true/false |

**sessionkey生成方案指导：**

###Code 获取 SessionKey

sessionKey说明：用于加解密隐私数据。
长度：32 字符十六进制数。
生成方式：md5(client_id+huid+timestamp+hsk)
 huid:宿主平台该用户的唯一标识 
 hsk: 宿主平台的sk
样例：1df09d0a1677dd72b8325aec59576e0c

open_id说明 ：该小程序用户在宿主平台的唯一标识。
长度：宿主自定义。
生成方式：宿主自定义。
样例：fe1c7147cd61abe9fbacbbae918f2661

**生成方式还是为建议把 只要满足生成的长度是32 字符十六进制数。**

sessionKey 用于AES加解密：Base64_decode(sessionKey) 作为 AES 的密钥。
建议数据表存储sessionkey，由appid（小程序标识） & huid（宿主用户id）做联合索引。


###SessionKey 校验

参数要求：
https://smartprogram.baidu.com/docs/develop/api/open_log/#checkSession/
技术实现参考：
根据huid&appid查找sessionkey，如果没有则返回false。
考虑到sessionkey存储量问题，且长期没有使用的sessionkey可能存在安全风险，建议定期对sessionkey进行清理，某个时间范围外的sessionkey从数据库删除。



##联调用例

###爱奇艺

http://swan-api-test.iqiyi.com/swan/oauth/getSessionKeyByCode?allow=all&code=helloworld@iqiyi



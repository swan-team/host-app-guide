**百度智能小程序**

**业务端开源能力接入方案**

背景说明
========

本方案针对智能小程序全面开源后，为所有开源联盟成员方如何在小程序平台业务端完整实施对接提供专向解决方案说明，以方便实施推进。

业务端开源能力全景图
====================

**角色说明**：

-   **联盟组织者(百度)**：统一负责的小程序帐号注册，资质提交，基础资质审核，物料提交与基础审核、小程序包基础审核，管理与分发、小程序核心库，非标准扩展库的管理与分发等。

-   **联盟成员**：提供APP宿主(集成小程序运行库)、开发个性组件

-   **小程序开发者**：开发、发布、运营小程序 或 委托TP开发

-   **TP（三方开发者**）：代开发、代发布、代运营小程序（TP可以视为高级开发者）

-   **小程序开源框架开发者**：优化开源代码、组件扩展

-   **第三方服务商**：提供第三方数据、广告、云服务能力

![](images/flow.png)

业务端接入流程
==============

整体功能用例图
==============

**名词说明：**

-   开源联盟平台：开放给开源联盟成员使用，提供统一访问入口。

-   百度小程序开发者平台：
    百度负责运维的平台，开放给所有的开发者使用，提供小程序所有管理能力

-   developer.baidu.com（百度开放平台)：
    百度对外开放生态能力的平台门户，提供统一API服务入口

-   百度小程序审核平台：提供统一的基础审核能力，包括资质，物料与小程序包)

-   小程序应用市场(PMS):
    提供统一的swan框架包，非标扩展包，小程序包管理与分发能力

![](images/register_from_server.png)

API设计说明
===========

>   开放给联盟成员平台使用的API，统一走百度开放平台(developer.baidu.com)进行Open
>   API授权后才能访问。

方案参见： <https://smartprogram.baidu.com/docs/develop/server/power_exp/>

调用服务权限校验方式：

**Client Credentials 授权**

采用 Client Credentials 方式，即应用公钥、密钥方式获取 Access Token, 后 Access Token 访问各服务接口。对于应用而言，其流程只有一步，即直接获取 Access Token。

使用 Client Credentials 获取 Access Token 需要应用在其服务端发送请求（推荐用POST方法）到百度 OAuth2.0 授权服务的 https://openapi.baidu.com/oauth/2.0/token地址上，并带上以下参数：<br>
```property
  grant_type：必须参数，固定为“client_credentials”<br>
  client_id： 必须参数，智能小程序的AppKey(AK) 从开发者平台中获取<br>
  client_secret：必须参数，智能小程序的AppSecret(SK) 从开发者平台中获取<br>
  scope：必须参数，固定为"smartapp_snsapi_base"
```
例如：

https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=Va5yQRHlA4Fq4eR&client_secret=0rDSjzQ20XUj5itV7WRtznPQS&scope=smartapp_snsapi_base

响应数据包格式
```JSON
{
　　"access_token":"1.a6b7dbd428f731035f771b8d15063f61.86400.1292922000-2346678-124328"
　　"expires_in":86400,
　　"refresh_token":"2.385d55f8615fdfd9edb7c4b5ebdc3e39.604800.1293440400-2346678-124328",
　　"scope":"smartapp_snsapi_base",
　　"session_key":"ANXxSNjwQDugf8615OnqeikRMu2bKaXCdlLxn",
　　"session_secret":"248APxvxjCZ0VEC43EYrvxqaK4oZExMB"
}
```
默认情况下，Access Token 的有效期为一个月，如果 Access Token 过期可以重新获取。


协议 统一使用https+json POST提交方式。

入参通过json 格式 以body方式提交， 返回结果也统一使用json格式返回

接口功能与设计
==============

页面与API列表如下：

| API / 功能            | 说明                                                                    | 角色           | 平台                 | 能力要求      |
|-----------------------|-------------------------------------------------------------------------|----------------|----------------------|---------------|
| 注册联盟成员          |                                                                         | 开源联盟成员   | 开源联盟平台         | 页面          |
|  获取小程序基础信息         | 批量查询小程序基础信息 | 开源联盟成员   | 开源联盟平台         | API      |
|  获取小程序包列表         | 查询某个小程序的包列表   | 开源联盟平台     | 开源联盟平台    | API      |
|  获取小程序包详情        | 查询某个小程序的包详情   | 开源联盟平台      | 开源联盟平台   | API      |
|  变更回调通知       | 当相关信息变更时，会通知到宿主方服务，由宿主方根据信息来检索相关信息   | 开源联盟平台      | 开源联盟平台   | API      |


### 基础接入能力

1.  **注册联盟成员**

**页面功能， 提供给开源联盟成员在页面上注册，注册成功后，会返回AK, SK,**

"officalNo":"开源联盟成员标识,数字类型"。
同时可以增加APP注册， 每个APP，会有独立的 "containerNo":"联盟宿主app标识,
数字类型"


2. **获取小程序基础信息**

接口调用请求说明
```property
GET https://openapi.baidu.com/rest/2.0/smartapp/oss/app/info?access_token=ACCESS_TOKEN&app_ids=
```

>   **入参**

| **字段**           | **类型** | **必填** | **描述**                                                             |
|--------------------|----------|----------|----------------------------------------------------------------------|
| ACCESS_TOKEN        | string | yes      | **授权小程序的接口调用凭据**                                                       |
| app_ids        | string   | yes      | **多个appid，** 使用","分隔多个 |

返回值说明

| **参数** | **类型** |  **描述**      |
|----------|----------|----------|
| app_id   | long     |  小程序的appid |
| app_name  | string   | 小程序的名称      |
| app_desc  | string   | 小程序的介绍内容      |
| photo_addr  | string   | 小程序logo      |
| qualification  | object   | 小程序账号对应的主体信息      |
| category  | array   | 小程序的行业信息      |
| min_swan_version  | string   | 小程序的名称      |
| app_name  | string   | 开发者工具最低版本      |
| status  | int   | 小程序的状态 -1代表封禁，1代表正常，2代表审核中，4代表暂停服务     |

错误情况下:

| **字段名** | **类型** |  **描述**      |
|----------|----------|----------|
| errno   | int     |  错误码 |
| msg  | string   | 错误描述信息，用来帮助理解和解决发生的错误      |

返回值示例

```JSON
{
  "errno": 0,
  "msg": "success",
  "data": [{
        "app_id": 111111,
        "app_name": "小程序",
        "app_desc": "1531812276", //描述
        "photo_addr": "[{\"cover\":\"https:\\/\\/b.bdstatic.com\\/searchbox\\/mappconsole\\/image\\/20180416\\/1523870283-34303.jpg\"}]",
        "qualification": {   //主体信息
            "name": "",  // 主体名称
            "type": 1, //  主体类型： 1：个人 2 企业 3： 政府 4：媒体  5：其他， 个人暂不开放
            "satus": 1,  // 0:未操作 1：通过 2：审核中 3：审核失败 4：推送失败
            "ad_type":  1, // 高级认证类型,0:未做高级认证、1:对公验证、2:活体验证
            "ad_status": 1  // 高级认证状态,1:通过、3:失败
        },
        "category": [   // 行业息息
            {
                "category_id": ,   // 二级行业id
                "category_name": ,   // 二级行业名称
                "category_desc":,    // 二级行业说明
                "parent": {     // 一级行业
                    "category_id": ,  // 一级行业id
                    "category_name": , // 一级行业名称
                    "category_desc": // 一级行业说明
                }
            }
        ],
        "min_swan_version": ,  // 开发者工具最低版本
        "status":  // -1代表封禁，1代表正常，2代表审核中，4代表暂停服务
  }]
}
```

3. 获取小程序包列表
接口调用请求说明
```property
GET https://openapi.baidu.com/rest/2.0/smartapp/oss/package/get?access_token=ACCESS_TOKEN&app_id=
```

>   **入参**

| **字段**           | **类型** | **必填** | **描述**                                                             |
|--------------------|----------|----------|----------------------------------------------------------------------|
| ACCESS_TOKEN        | string | yes      | **授权小程序的接口调用凭据**                                                       |
| app_id        | long   | yes      | 小程序appid |


返回值说明

| **参数** | **类型** |  **描述**      |
|----------|----------|----------|
| version   | string     |  版本号 |
| remark  | string   | 备注      |
| msg  | string   |审核信息容      |
| committer  | string   | 提交人    |
| status  | int   | 状态      |
| commit_time  | string   | 提交时间      |
| version_desc  | string   | 版本描述      |
| package_id  | string   | 代码包id      |
| rollback_version  | string   | 上一个线上版本的版本号     |
| upload_status  | int   | 上传状态      |
| upload_status_desc  | string   | 上传状态描述     |

代码包status字段码表

| **status** | **含义** |
|----------|----------
| 1   | 线上版本     |
| 3  | 开发中   |
| 4   | 审核中     |
| 5  | 审核失败   |
| 6   | 审核通过     |
| 8  | 回滚中   |


错误情况下:

| **字段名** | **类型** |  **描述**      |
|----------|----------|----------|
| errno   | int     |  错误码 |
| msg  | string   | 错误描述信息，用来帮助理解和解决发生的错误      |

返回值示例
```JSON
{
  "errno": 0,
  "msg": "success",
  "data": [
    {
      "version": "1.2.6",
      "remark": "",
      "msg": "审核通过",
      "committer": "--",
      "status": 1,   // 1:线上版本  3:开发中  4:审核中  5:审核失败  6:审核通过  8:回滚中
      "commit_time": "2018/09/04 17:13:59",
      "version_desc": "desc",
      "package_id": 1,
      "rollback_version": "v1.2.5"
    },
    {
       "version": "1.2.7",
       "commit_time": "2018/09/06 15:32:38",
       "version_desc": "desc",
      "upload_status": 1,  //  1:上传中 3:上传失败
      "upload_status_desc": "上传中"
    }
  ]
}
```


4. 获取授权小程序包详情
接口调用请求说明
```property
GET https://openapi.baidu.com/rest/2.0/smartapp/oss/package/getdetail?access_token=ACCESS_TOKEN&type=TYPE&app_id=APP_ID&package_id=PACKAGE_ID
```

 **入参**

| **字段**           | **类型** | **必填** | **描述**                                                             |
|--------------------|----------|----------|----------------------------------------------------------------------|
| ACCESS_TOKEN        | string | yes      | **授权小程序的接口调用凭据**                                                       |
| app_id        | long   | yes      | 小程序appid |
| type        | int   | no      | 小程序状态，不指定package_id的情况下默认是线上版本 |
| package_id        | long   | no      | 代码包id |

代码包status字段码表

| **status** | **含义** |
|----------|----------
| 1   | 线上版本     |
| 3  | 开发中   |
| 4   | 审核中     |
| 5  | 审核失败   |
| 6   | 审核通过     |
| 8  | 回滚中   |

返回值说明

| **参数** | **类型** |  **描述**      |
|----------|----------|----------|
| version   | string     |  版本号 |
| remark  | string   | 备注      |
| msg  | string   |审核信息容      |
| committer  | string   | 提交人    |
| status  | int   | 状态      |
| commit_time  | string   | 提交时间      |
| version_desc  | string   | 版本描述      |
| package_id  | string   | 代码包id      |



错误情况下:

| **字段名** | **类型** |  **描述**      |
|----------|----------|----------|
| errno   | int     |  错误码 |
| msg  | string   | 错误描述信息，用来帮助理解和解决发生的错误      |


5. 变更回调通知
  回调机制：当相关信息变化时，统一通过消息推送(kafka) 变更通知，通知定义如下，收到通知后
  由宿主方使用api来获取新的数据内容。

  内容格式
  ```JSON
  {
    code：100,
    data:{app_id:1111}
  }
  ```

  变更通知码表


  | **通知码** | **数据** |  **说明**      |
  |----------|----------|----------|
  | 100   | {app_id:1111}   |  小程序基本信息变更 |
  | 101  | {app_id:1111, package_id:11111}   | 小程序包信息变更,包括状态变更      |

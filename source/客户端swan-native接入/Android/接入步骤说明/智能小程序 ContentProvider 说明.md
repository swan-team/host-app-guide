# 智能小程序 ContentProvider 说明

### 概述

为满足外部应用获取历史、收藏等数据的需求，提供了小程序统一 ContentProvider，以便于应用间交互、获取相关数据


### 使用说明

##### 权限声明

`com.baidu.swan.permission.READ_SWAN_PROVIDER`

`com.baidu.swan.permission.WRITE_SWAN_PROVIDER`

##### 鉴权配置

JSON 配置文件中，添加调用者签名信息 MD5 值，key 为 `signature` ，value 类型为数组，可按需配置一个或多个

**示例**

```
{
  "officialNo": -1,
  "containerNo": -1,
  "hostName": "bdswan",
  "schemeHead": "bdswan",
  "version": 1,
  "signature":["04FBDAAFE9AEC336FF4CB89F97CDCB2F","8B05425E348AA6B99A2725BBD3B27905"]
}
```


#### 1. 智能小程序历史、收藏

###### 使用说明
通过 `ContentProvider` 的 `query` 方法进行访问

```
getContentResolver().query(URI)
```
查询小程序收藏数据URI：`content://com.baidu.swan.provider/favorite`

查询小程序历史数据URI：`content://com.baidu.swan.provider/history`

###### Cursor 信息

| 列名 | 类型 |含义 |
| --- | --- |--- |
| app_id | string |小程序 ID|
| app_key | string| 小程序Key |
| app_sign | string| 小程序信息sign |
| version_code | int | 版本号 |
| version_name | string | 版本名称 |
| description | string | 描述信息|
| app_status | int | 小程序状态（封禁、下线等），0 表示正常运行 |
| status_detail | string| 状态详细信息 |
| status_desc | string | 状态描述 |
| resume_date | string | 恢复时间 |
| icon_url | string | Icon Url|
| app_name | string | 名称|
| service_category | string | 服务类目 |
| subject_info | string | 主体信息|
| type | int | 类型：正式版-0、开发版-1、审核版-2、体验版-3 |
| pkg_size | long | 主包大小，单位：B|
| app_category | int | 类别：小程序-0、小游戏-1|
| orientation | int | 屏幕方向：横屏-0、竖屏-1|
| create_time | long | 本地包创建时间 |
| app_from | string | 小程序加入历史的 from 参数（仅查询历史时存在） | 
| visit_time | long |最后一次访问时间（仅查询历史时存在）|
| favorite_time | long |收藏时间（仅查询收藏时存在）| 

#### 2. 智能小程序私有参数

> 获取小程序推荐列表使用

###### 使用说明
通过 `ContentProvider` 的 `query` 方法访问获取

```
getContentResolver().query(URI)
```
获取智能小程序私有参数URI：`content://com.baidu.swan.provider/params`

###### Cursor 信息

| 列名 | 类型 |含义 |
| --- | --- |--- |
| params | string | 具体参数信息 |

# 小游戏接入说明-Android

### 总体说明

+ 代码地址：https://github.com/swan-team/swan-game-android
+ 目前接小游戏，必须先接入小程序，小游戏共用了小游戏的代码和API。
+ 小游戏支付必须使用百度支付（目前依赖百度账号，后续统一账号解决依赖问题）。


### 小游戏库说明

+ 需要包含小程序的所有lib，额外加上如下的小游戏专用lib。
+ lib-swan-v8：小游戏的v8引擎，运行小游戏必须的。
+ lib-swan-ad：小游戏的广告模块，用于小游戏中的广告展示和游戏复活等。

### 需要实现的接口(主要是Server实现CS协议)

+ 开放域（用于存储和获取小游戏和玩家的信息）
	* 接口位置：com.baidu.swan.apps.ioc.interfaces.AbsSwanAppConfig
	* 防沉迷，必须实现，不需要登录，外部Server自己实现 AbsSwanAppConfig#getCheckIsToRestUrl
	    - 接口：POST /ma/game/rest/checkIsUserAdvisedToRest
	    - POST参数:
	    
    	    ```
                {
                "ma_id": "", // 小程序id
                "todayPlayedTime": "", // 今天玩游戏的时间
               }
            ```

	    - 返回数据：

    	    ```
    	    {
                "errno": "0", // 0正常，-1异常
                "errmsg": "", // 失败提示
                "data": {
                    "result": "0/1" // 结果是否建议用户休息
                 }
            }
            ```
     * 存储 游戏玩家的数据，必须实现，依赖 设备id（不登录）/用户id（登录） + 小游戏id AbsSwanAppConfig#getSetUserCloudStorageUrl，不登录用户不会同步数据，登录之后可以同步数据  
        - 接口：POST /ma/game/od/set_user_cloud_storage
        - POST参数：
            
            ```
            {
                "ma_id": "", // 小程序id
                "data": [
                    {
                        "key": "key1",  // 保存数据的 key
                        "value": "value1"  // 保存数据的值
                    },
                    {
                        "key": "key1",
                        "value": "value1"
                    }
                ]
            }
            ```
        - 返回数据：
        
            ```
            {
                "errno": "0", // 0正常，-1未知异常，-2数据超限
                "errmsg": "", // 失败提示
            }
            ```
    
    * 获取 游戏玩家的数据，必须实现，依赖 设备id（不登录）/用户id（登录） + 小游戏id   AbsSwanAppConfig#getGetUserCloudStorageUrl ，不登录用户不会同步数据，登录之后可以同步数据  
        - 接口：POST /ma/game/od/get_user_cloud_storage
        - POST参数：
        
            ```
            {
                "ma_id": "", // 小程序标识
                "key_list": [
                    "key1",  // 已保存的数据的键名
                    "key2"
                ]
            }
            ```
        - 返回数据：
        
            ```
            {
                "errno": "0", // 0正常，-1未知异常
                "errmsg": "", // 失败提示
                "data": [
                    {
                        "key": "key1",   // 保存数据的键名
                        "value": "value1"  // 保存数据的值
                    },
                    {
                        "key": "key2",
                        "value": "value2"
                    }
                ]
            }
            ```
    * 删除 游戏玩家的数据，必须实现，依赖 设备id（不登录）/用户id（登录） + 小游戏id   AbsSwanAppConfig#getRemoveUserCloudStorageUrl，不登录用户不会同步数据，登录之后可以同步数据 
        - 接口：POST /ma/game/od/remove_user_cloud_storage
        - POST参数：
            
            ```
            {
                "ma_id": "", // 小程序标识
                "key_list": [
                    "key1",
                    "key2"
                ]
            }
            ```
        - 返回数据：
        
            ```
            {
                "errno": "0", // 0正常，-1未知异常
                "errmsg": "", // 失败提示
            }
            ```
            
    * 根据swanId获取用户信息，依赖账号，无账户的宿主，不实现（不实现获取不到排行榜相关信息） AbsSwanAppConfig#getGetUserInfoUrl
        - 接口：POST /ma/game/od/get_user_info
        - POST参数：
        
            ```
            {
                "ma_id": "", // 小程序标识
                "lang": "",
                "swanid_list": [ // swanid 有重复过滤
                  "selfSwanId", // 如果需要获取自己的信息时用这个
                  "swanid1",
                  "swanid2"
              ],
             "swanid_list":[] ,swanid_list为空时只有一对中括号 里面有任何东西都会报错
            }
            ```
            
        - 返回数据：
        
            ```
            {
                "data": [
                    {
                      "swanId": "Sg5Cek49KyRkVqEqVaEGn2Jgjddfdfdcf4454dfdfdfd49A8vbp3ogPSoztZEcjhBVi8tRu8A",
                      "nickname": "发的发的发",
                      "avatarUrl": "",
                     "gender": "1",  // 1-男 2-女
                     "city": "北京市",
                     "province": "",
                        "country": "中国", // 默认
                        "language": "中文"  // 默认
                 }
               ],
              "errmsg": "succ",
              "errno": "0",
               "request_id": "2152759139",
               "tipmsg": ""
            }
            ```
            
    * 获取已经关注人的用户信息，依赖账号，无账户信息的宿主，不实现（不实现获取不到排行榜相关信息） AbsSwanAppConfig#getGetFollowCloudStorageUrl
        - 接口：POST /ma/game/od/get_follow_cloud_storage
        - POST参数：
        
            ```
            {
                "ma_id": "", // 小程序标识
                 "key_list": [
                     "key1",
                     "key2"
                   ]
            }
            ```
        
        - 返回参数：
        
            ```
            {
                "errno": "0", // 0正常，-1未知异常
                "errmsg": "" // 失败提示
                "data": [
                    {
                        "swanId": "",
                        "avatarUrl": "",
                        "nickname": ""
                        "KVDataList": [
                            {
                                "key": "key1",
                                "value": "value1"
                            },
                            {
                                "key": "key2",
                                "value": "value2"
                            }
                        ]
                    },
                    {
                        "swanId": "",
                        "avatarUrl": "",
                        "nickname": ""
                        "KVDataList": [
                            {
                                "key": "key1",
                                "value": "value1"
                            },
                            {
                                "key": "key2",
                                "value": "value2"
                            }
                        ]
                    }
                ]
            }
            ```
    * 获取双向关注人的用户信息，依赖账号,无账户信息的宿主，不实现（不实现获取不到排行榜相关信息） AbsSwanAppConfig#getGetFriendCloudStorageUrl
        - 接口：POST /ma/game/od/get_friend_cloud_storage
        - POST参数：
            
            ```
            {
                "ma_id": "", // 小程序标识
                "key_list": [
                    "key1",
                    "key2"
                ]
            }
            ```
        - 返回数据：
        
            ```
            {
                "errno": "0", // 0正常，-1未知异常
                "errmsg": "" // 失败提示
                "data": [
                    {
                        "swanId": "",
                        "avatarUrl": "",
                        "nickname": ""
                        "KVDataList": [
                            {
                                "key": "key1",
                                "value": "value1"
                            },
                            {
                                "key": "key2",
                                "value": "value2"
                            }
                        ]
                    },
                    {
                        "swanId": "",
                        "avatarUrl": "",
                        "nickname": ""
                        "KVDataList": [
                            {
                                "key": "key1",
                                "value": "value1"
                            },
                            {
                                "key": "key2",
                                "value": "value2"
                            }
                        ]
                    }
                ]
            }
            ```
   
    
+ 交叉换量(用于在小游戏上推荐其他小游戏，换量用的；外部暂时无法使用，暂时不需要实现)
    * 接口位置：AbsSwanAppConfig#getGetRecommendationListUrl 和 AbsSwanAppConfig#getRecommendationTransferReportUrl （暂时不用实现，默认返回null即可）
    * 目前应该必须使用百度的Server，因为交叉换量需要小游戏开发者申请，总不可以每个宿主都申请一次
    * 和账户无关，不需要登录
    * 目前由于账号问题，暂时无法直接使用百度Server，暂时空实现即可。
    
+ 其他接口，不需要关系，默认实现即可。

### 其他问题

+ 目前支付能力依赖于百度账号，所以外部目前无法使用小游戏的支付能力，建议将带支付能力的游戏屏蔽。（统一账号在建设中，完毕之后可正常支付）
+ AbsSwanAppConfig中有一些没在文档里提到的接口，属于目前还用不到的私有接口，外部不需要实现，默认即可，只需要实现AbsSwanAppConfig中的所有abstract方法。


<!-- TOC -->

- [1. BBAMNPAuthorizeProtocol](#1-bbamnpauthorizeprotocol)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. BBAMNPAuthorizeProtocol
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-18|初始版本|

--------------------------
## 1.2. 功能说明

* 授权、鉴权相关


## 1.3. 开发指南

* 调用方式，通过Pyramid调用
* 1、获取对象

```
  Pyramid.bba_MNPAuthorize
```
* 2、调用方法

```
[Pyramid.bba_MNPAuthorize requestScope:BBAMNPAuthorizeScopeCamera
                            appID:appID
                          succeed:^(NSDictionary *map) {
                              // check system camera authorize
                              NSInteger cameraPermission = [UIDevice bba_checkPermission:BBADevicePermission_Camera];
                              // 系统权限获取失败,没给手百授予这个权限
                              if (cameraPermission == 1
                                  || cameraPermission == 2) {
                                  dispatchErrorWithStatus(MNPAuthorize_Camera_SystemDeny,
                                                          kBBAMNPAuthorizeResultSystemDenyErrorMSG);
                                  return ;
                              }
                              // authorize sucess
                              [self insertAfterAuthorize:dispatcher
                                       atPlaceHolderView:placeHolderView];
                              
                          } error:^(BBAMNPAuthorizeError errorCode,
                                    NSDictionary *data) {
                              switch (errorCode) {
                                  case BBAMNPAuthorizeErrorUserDeny:
                                      dispatchErrorWithStatus(MNPAuthorize_Camera_UserDeny,
                                                              kBBAMNPAuthorizeResultDenyErrorMSG);
                                      break;
                                  default:
                                      [dispatcher doCallbackWithStatus:kBBAMNPCallBackResultNetworkErrorStatus
                                                               message:kBBAMNPAuthorizeResultNetworkErrorMSG
                                                                  data:nil];
                                      break;
                              }
                          }];
```
* 3、方法列表

```

/**
 *  尝试触发登录用户
 *
 */
+ (void)checkAndTryLoginUserAppId:(NSString *)appId
                        loginType:(BBAMNPAccountLoginType)loginType
                          succeed:(dispatch_block_t)succeedCallback
                            error:(dispatch_block_t)errorCallback;

/**
 *  请求alert信息，如果不需要弹框则直接返回. 本地权限bduss可以传nil
 *
 */
+ (void)requestScope:(NSString *)scope
               appID:(NSString *)appID
             succeed:(BBAMNPAuthorizeMapCallback)succeedCallback
               error:(BBAMNPAuthorizeErrorCallback)errorCallback;
/**
 *  确认登录状态
 *
 */
+ (void)checkLoginStateClient:(BBAMNPAppIdentifyInfo *)info
                      succeed:(BBAMNPAuthorizeMapCallback)succeedCallback error:(BBAMNPAuthorizeMapCallback)errorCallback;

/**
 *  获取用户授权信息列表
 *
 */
+ (void)getAppIDActionListClientEx:(NSString *)clientID
                           succeed:(BBAMNPAuthorizeMapCallback)succeedCallback
                             error:(BBAMNPAuthorizeMapCallback)errorCallback;

/**
 *  修改权限
 *
 */
+ (void)modifyAuthorizeScopeByAppID:(NSString *)appID
                              scope:(NSString *)scope
                       operatorType:(BBAMNPAuthorizeOperatorType)opType
                        requestType:(BBAMNPAuthorizeRequestType)requestType
                            succeed:(BBAMNPAuthorizeDeterminatedCallback)succeedCallback
                              error:(BBAMNPAuthorizeMapCallback)errorCallback;

/**
 *  获取 swan id
 *
 */
+ (void)getSwanId:(NSString *)appID
          succeed:(BBAMNPAuthorizeMapCallback)succeedCallback
            error:(BBAMNPAuthorizeMapCallback)errorCallback;

/**
 *  获取私有的用户信息接口，仅仅暴露给slave组件，master不能调用
 *
 */
+ (void)getPrivateGetUserInfoByClient:(NSString *)clientID
                              succeed:(BBAMNPAuthorizeMapCallback)succeedCallback
                                error:(BBAMNPAuthorizeMapCallback)errorCallback;

/**
 *  获取开放数据, 成功的话，返回 相关的服务器透传数据。 失败的话，返回错误
 *
 *  @params params NSDictionary    key: scope
 *
 */
+ (void)getOpenData:(NSString *)appId
             appKey:(NSString *)appKey
             params:(NSDictionary *)params
            succeed:(BBAMNPAuthorizeMapCallback)succeedCallback
              error:(BBAMNPAuthorizeErrorCallback)errorCallback;

#pragma mark - ut

/**
 *  计算rasign值，
 *
 *  @param delta 客户端收到时间 - 服务器时间
 @  @param timestamp 预计的服务器时间 = 客户端收到时间 - delta
 *
 */
+ (NSString *)rasignByDelat:(NSInteger)delta timestamp:(int64_t)timestamp;

/**
 当前的小程序是否有scope对应的权限

 @param scope scope
 @param appID appID
 @return return YES有权限
 */
+ (BOOL)hasAuthorityForScope:(NSString *)scope
                       appID:(NSString *)appID;

/**
 * 数据请求结点，存储用于要请求的结点对应的模型数据，用于发起请求的参数获取key 为要请求的节点名，其中为 @"accredit":表示授权相关数据
 * value 为遵守 BBAMNPUpdateModule 协议的模型对象
 */
+(NSMutableDictionary<NSString *,id<BBAMNPUpdateModule>> *)moduleMap:(NSString *)appID;
```
  



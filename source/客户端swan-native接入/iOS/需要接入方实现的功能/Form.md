<!-- TOC -->

- [1. Form](#1-form)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)

<!-- /TOC -->
# 1. Form
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-17|初始版本|

--------------------------
## 1.2. 功能说明

当[表单组件](https://smartprogram.baidu.com/docs/develop/component/formlist/#form/)的report-submit设置为YES时，小程序框架会调用此接口获取FormID

## 1.3. 开发指南
* 实现接口BBAMNPFormProtocol

```
@protocol BBAMNPFormProtocol <NSObject>
/**
 获取formid

 @param appID appID
 @param success {formid:server返回的表单id,life:用户发送表单请求一天的限制次数}
 @param fail errorInfo 错误信息描述 errorCode 错误码
 */
+ (void)requestFormId:(NSString *)appID
              success:(void (^)(NSDictionary *paraseData))success
                 fail:(void (^)(NSString *errorInfo, NSString *errorCode))fail;
@end

```
* 示例

```
+ (void)requestFormId:(NSString *)appID
              success:(void (^)(NSDictionary *paraseData))success
                 fail:(void (^)(NSString *errorInfo, NSString *errorCode))fail{
    BBANormalAPIRequest *request = [[BBANormalAPIRequest alloc] init];
    request.method = APIRequestMethodPOST;
    NSString *hoststr = [BBAMNPPlatformService rootServerHost];
    // 获取时间戳
    NSTimeInterval currentTiemstamp = [[NSDate date] timeIntervalSince1970];
    NSInteger updateDelta = 0;
    NSString *rasign = [self rasignByDelat:updateDelta timestamp:currentTiemstamp];
    NSString *urlString = [[NSString alloc] initWithFormat:@"%@/%@?timestamp=%lld&rasign=%@&delta=%zd&%@", hoststr, FORM_GetFormId_URL,(long long)currentTiemstamp,rasign,updateDelta,[BBAMNPPlatformService composeParameters]];
    request.url = urlString;
    
    if (CHECK_STRING_VALID(appID)) {
        [request setParam:appID forKey:@"appkey"];
    }
    
    [request startWithCompletionBlock:^(__kindof BBABaseAPIRequest * _Nonnull apiRequest) {
        NSDictionary *responseDic = [NSJSONSerialization JSONObjectWithData:apiRequest.responseData
                                                                    options:NSJSONReadingMutableLeaves
                                                                      error:nil];
        if (responseDic) {
            NSString *errCode = [NSString stringWithFormat:@"%@",responseDic[@"errno"]];
            if ([errCode isEqualToString:@"0"]) {
                if (success) {
                    success(responseDic);
                }
            } else {
                if (fail) {
                    if (responseDic[@"tipmsg"]) {
                        fail(responseDic[@"tipmsg"], errCode);
                    } else {
                        NSString *errMsg = responseDic[@"errmsg"];
                        if (!errMsg || ![errMsg length]) {
                            errMsg = @"请求数据异常";
                        }
                        fail(errMsg, errCode);
                    }
                }
            }
        } else {
            if (fail) {
                fail(@"数据解析异常", @"-1");
            }
        }
    } failure:^(__kindof BBABaseAPIRequest * _Nonnull apiRequest,
                __kindof NSError * _Nonnull error) {
        if (fail) {
            NSString *errCode = [NSString stringWithFormat:@"%@",@(apiRequest.responseStatusCode)];
            fail(apiRequest.responseString, errCode);
        }
    }];
}

```



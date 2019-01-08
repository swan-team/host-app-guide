
### 功能说明

小程序运行过程中，如遇到小程序SDK版本较低、需要升级的场景，会通过接口将时机回调给宿主，需要宿主做对应实现

宿主可通过接口返回值告知小程序SDK是否消费了此次事件，如宿主消费，则小程序SDK不做其余处理；宿主未消费，则小程序针对场景做默认实现


### 场景示例

小程序下载时，如果当前小程序SDK版本较低不能满足相应小程序运行要求，Server通过错误码告知小程序SDK，SDK此时会通过接口回调到宿主，宿主有两种选择：
	
* 宿主处理（比如可提示升级宿主应用版本），则小程序SDK不做其余操作
* 宿主不处理，小程序SDK执行默认处理，展示错误弹窗

> 当前仅在此种场景下，回调升级接口
 
### 接口设计
 
 接口：`ISwanAppSdkUpgrade`
 
```
public interface ISwanAppSdkUpgrade {

    /**
     * 小程序SDK版本过低，需要升级
     *
     * @param appId   小程序Id
     * @param errCode 错误码，当前为{@link PMSConstants.NetworkError.Code#NEED_UPDATE_SDK}
     * @return true: 宿主处理升级逻辑，false: 宿主不处理升级逻辑
     */
    boolean onSwanAppSdkNeedUpgrade(String appId, long errCode);
}
```
小程序SDK会通过此接口通知宿主需要升级，接口方法`onSwanAppSdkNeedUpgrade`返回值标识宿主是否消费此次事件
 


 
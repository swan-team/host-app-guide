


#### 如何利用SwanAppExtensionImpl拓展API（可选实现，非必须实现接口）


#### 一、创建一个拓展API

* 创建一个class继承SwanAppAction
* 与前端约定好ACTION_TYPE字段，该字段代表API和前端的协议名
* 将该API注册在```SwanAppExtensionImpl#regActions(UnitedSchemeAiAppDispatcher)```当中
* 在```SwanAppExtendSchemeSampleAction#handle(Context, UnitedSchemeEntity, CallbackHandler, AiApp)```当中进行业务代码的编写(AiAppExtendSchemeDemo只是实例代码)

#### 二、关于回调相关
* 回调包括同步回调（一级回调）和异步回调（二级回调），每一级回调中都封装了一个json结构体
格式如下：
```
    {
      "data":{
        "extra":"" // data内的结构都是可以定制的，extra只是示例，和前端约定好就可以
      }
      "status":""
      "message":""
    }
```
其中data的值是可以自己定制的json结构体，同步回调和异步回调都封装了该结构，另外也都提供了可以缺省部分值的封装方法（例如缺省data，或者message等等），相关方法都在```UnitedSchemeUtility```类当中
#### 1、构造同步参数
* 构造同步回调，调用```UnitedSchemeUtility#callCallback(CallbackHandler handler, UnitedSchemeEntity entity, int statusCode)```方法可以将回调传给前端（该方法缺省了data和msg两个参数，data默认为null，message小程序框架将根据statusCode自动补全message信息）
#### 2、构造异步回调参数（可选）
* 构造异步回调，调用以下方法：
```
handler.handleSchemeDispatchCallback(cb, UnitedSchemeUtility.wrapCallbackParams(data,
                        UnitedSchemeStatusCode.ERR_OK, TEST).toString());
```
cb为和前端约定好的回调key值，传递value值还是和同步回调一样的json结构体，适用于异步业务逻辑处理完成时候，将状态回调给前端，由前端完成向小程序开发者传递信息的工作
#### 三、示例代码
* 可以参考```SwanAppExtendSchemeSampleAction```中的代码来构建自己的拓展API

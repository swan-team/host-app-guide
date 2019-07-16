# 智能小程序 APK 集成方案

### 总体说明

+ 当前集成方案，本质上是对外提供一个可以直接运行的APK，直接安装到系统就可以运行小程序和小游戏。
+ 对外提供了调启入口，遵循调启协议就可以直接从外部调启/运行指定的小程序和小游戏，具体调启协议见下文。 
+ 作为一个完整功能的APK，其账号体系、服务Server、支付系统等等全部使用百度已有解决方案（即：使用百度账号体系、使用百度的服务Server、使用百度的支付系统等，全部采用百度的方案）。 
+ APK包的大小，目前**release在20M**左右，后续会根据业务量的增加而动态增加体积。


### 接入说明

+ 需要到宿主接入平台注册宿主信息https://ossunion.baidu.com/opensource/home/setting.html，我们会使用宿主注册的配置信息生成对应的apk文件。
+ 对外原则上不提供源码，只提供一个release版本的APK包，第三方直接安装到自己的系统即可。
+ 对外提供通用的首页界面，除了从外部直接调启，还可以从首页搜索需要的小程序/小游戏运行。
+ 外部可以根据业务需要，从百度的PMS包管理平台拉取需要的小程序/小游戏，自己做界面（如手机的负一屏，自有APP的某个页面等），可以支持从外部直接跳转到智能小程序，运行指定的小程序和小游戏。

### 调启协议

+ 隐式调启（不需要指定包名）
	* 1.唤醒小程序apk进程，但是不启动任何小程序和页面
	
		```
		Intent intent = new Intent("com.baidu.swan.launcher");
		startActivity(intent);
		```
	* 2.打开指定的小程序/小游戏（scheme形式）
 
	  ```
	   Intent intent = new Intent("android.intent.action.VIEW");
	   String swanApp = "宿主协议头://swan/4fecoAqgCIUtzIyA4FAPgoyrc4oUc25c";
	   String swanGame = "宿主协议头://swangame/Tan0qRoM4kin8o2omNDfihwektSVqKOh";
	   intent.setData(Uri.parse(swanApp)); // 启动小程序
	   //intent.setData(Uri.parse(swanGame)); // 启动小游戏
	   startActivity(intent);
	  ```
 
   * 3.打开指定的小程序/小游戏（通过参数形式打开）
  
		```
		Intent intent = new Intent("com.baidu.swan.launcher");
		String swanApp = "宿主协议头://swan/4fecoAqgCIUtzIyA4FAPgoyrc4oUc25c";
		String swanGame = "宿主协议头://swangame/Tan0qRoM4kin8o2omNDfihwektSVqKOh";
		String swanHttp = "http://smartapp.baidu.com/mappconsole/api/packagescheme?appKey=qVHj5yIqP7VeWXRhFFhlFjjeump4UfrT&packageId=17381"
		intent.putExtra("SWAN_URI",swanApp); // 启动小程序
		//intent.putExtra("SWAN_URI",swanGame); // 启动小游戏
		//intent.putExtra("SWAN_URI",swanHttp); // 扫码得到的小程序或小游戏的地址（实际会到百度的server获取真正的启动参数，由小程序框架自动完成）
		startActivity(intent);
		```

+ 显式调用（指定包名和入口Activity名）
	* 在隐式调启协议的基础上，加上包名和入口名即可，可以减少系统的查找耗时，直接定向打开，如：
	
		```
		Intent intent = new Intent("com.baidu.swan.launcher");
		ComponentName componetName = new ComponentName(
	                        "com.baidu.swan", // 包名
	                        "com.baidu.swan.activity.SwanEntryActivity" // 入口Activity名
	                        );
	   intent.setComponent(componetName)
	   startActivity(intent);
		```
   * SwanEntryActivity 是入口activity没有任何界面，如果小程序进程没有启动，则会先启动小程序进程，如果已经启动小程序进程，则直接打开指定的小程序。


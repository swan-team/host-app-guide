# 权限说明

## 一、已申请、已使用
|权限名称|权限|严重程度|使用模块|
|--|--|--|--|
|获取粗略位置|ACCESS_COARSE_LOCATION|高敏|小程序小游戏定位、T7内核、定位业务|
|获取精确位置|ACCESS_FINE_LOCATION|高敏|小程序小游戏定位、T7内核、定位业务|
|摄像头|CAMERA|高敏|小程序业务、T7内核等需要拍照的场景|
|读取联系人|READ_CONTACTS|高敏|小程序私有能力ReadContactsAction（**百度外部没有可以不加**）|
|读取外置存储卡|READ_EXTERNAL_STORAGE|高敏|小程序小游戏、Fresco、T7内核、地图定位、Webkit框架等|
|读取手机状态和身份|READ_PHONE_STATE|高敏|小程序业务、设备识别、Webkit框架等|
|录音|RECORD_AUDIO|高敏|小程序录音能力|
|写入外部存储卡|WRITE_EXTERNAL_STORAGE|高敏|小程序小游戏、Fresco、T7内核、地图定位、Webkit框架等|
|查看WLAN连接|ACCESS_WIFI_STATE|中敏|小程序、小游戏的网络模块|


## 二、使用未申请说明（代码里会有，但是没有在Maninfest中声明）

|权限名称|权限|严重程度|使用模块|
|--|--|--|--|
|查找设备上的帐号|GET_ACCOUNTS|高敏|T7内核（有前置判断，可以不加）|
|访问定位额外命令|ACCESS_LOCATION_EXTRA_COMMANDS|低敏|百度定位SDK（有保护，可以不加）|
|使用蓝牙|BLUETOOTH|低敏|T7内核（有前置判断）、小程序蓝牙功能没上（可以不加）|
|访问蓝牙设置|BLUETOOTH_ADMIN|低敏|T7内核（有前置判断，可不加）、小程序蓝牙功能没上（可以不加）|
|检索正在运行的应用|GET_TASKS|低敏|定位SDK、T7内核等（已废弃，不需要加）|
|近距离通讯操作|NFC	|低敏|T7内核（有前置判断，可以不加）|

## 三、废弃权限（Manifest中有，代码暂时没用到的）
|权限名称|权限|严重程度|使用模块|
|--|--|--|--|
|发送短信|SEND_SMS|高敏|私有业务，百度外不需要加|
|开机启动|RECEIVE_BOOT_COMPLETED|中敏|私有业务，百度外不需要加|
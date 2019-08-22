# Sailor 后下载使用说明

### 客户端开关配置

> 基于 `pyramid` 插件实现 `ISwanSailor` 接口

```
@Service
@Singleton
public class SwanSailorImpl implements ISwanSailor {

    /**
     * 是否使用预置Sailor，可根据实际情况返回结果
     */
    @Override
    public boolean isSailorPreset() {
        return true;
    }

    /**
     * Sailor是否安装，不要修改此方法实现
     */
    @Override
    public boolean isSailorInstalled() {
        return isSailorPreset() || SwanSailorConfig.isSailorCoreInstalled();
    }

    /**
     * 安装Sailor，不要修改此方法实现
     *
     * @param listener 安装结果回调
     */
    @Override
    public void installSailorCore(final SwanSailorInstallListener listener) {
        SwanSailorCoreInstaller.get().addListener(new OnInstalledListener() {
            @Override
            public void onSuccess() {
                listener.onSuccess();
            }

            @Override
            public void onFail() {
                listener.onFail();
            }

            @Override
            public void onProgress(long current, long sum) {
                listener.onProgress(current, sum);
            }
        }).tryInstall();
    }
}
```

##### 使用预置方式

* 方法`SwanSailorImpl#isSailorPreset` 返回 `true`
* `lib-swan-core` Module添加依赖 `deps.swan.sailor_so`（`sailor_so` Module 包含了需要的 so 文件）

##### 使用后下载方式

* 方法`SwanSailorImpl#isSailorPreset` 返回 `false`
* 在`SwanDownloadUrlConfig#buildGetSailorUrl()`方法中返回实际的后下载地址，此地址需要宿主方根据后下载协议实现Server逻辑。
* 应用覆盖安装升级后，如果有更新 Sailor 的需要，需要在检测到应用升级后调用 `SwanSailorConfig.markHostUpgrade();`，以便在启动小程序前，向 Server 请求新的 Sailor


### 初始化

在 `Application` 的 `onCreate` 方法中需要执行 Sailor 初始化逻辑，可参考小程序开源仓库 `SwanAppInitHelper#initSwanAppModule()`方法中的逻辑

```
WebViewFactory.initOnAppStart(AppRuntime.getAppContext(), false, false);
if (SwanAppRuntime.getSwanSailorRuntime().isSailorInstalled()) {
    SwanSailorInitHelper.getInstance(appContext).initBWebkitAsync(ProcessUtils.isMainProcess());
    // 主进程中提前唤醒小程序进程，加快小程序启动速度
    if (ProcessUtils.isMainProcess()) {
        SwanAppEnv.get().initIfNecessary(null);
    }
} else {
    SwanSailorCoreInstaller.get().addListener(new OnInstalledListener() {
        @Override
        public void onSuccess() {
            SwanSailorInitHelper.getInstance(appContext).initBWebkitAsync(ProcessUtils.isMainProcess());
            // 主进程中提前唤醒小程序进程，加快小程序启动速度
            if (ProcessUtils.isMainProcess()) {
                SwanAppEnv.get().initIfNecessary(null);
            }
        }
        @Override
        public void onFail() {
            if (DEBUG) {
                Log.e(TAG, "SwanSailorCoreInstaller onFail ");
            }
        }
        @Override
        public void onProgress(long current, long sum) {
            if (DEBUG) {
                Log.i(TAG, "SwanSailorCoreInstaller onProgress: " + current + "/" + sum);
            }
        }
    }).tryInstall();
}
```

### 后下载CS协议

##### 请求参数

| 参数        | 数据类型 | 说明                           |
| ------------- | -------- | -------------------------------- |
| cuid          | string   | 用户唯一标识               |
| uuid          | string   | 用户唯一标识               |
| ua            | string   | 用户平台类型、客户端版本号等信息 |
| host_app      | string   | 宿主App名称                  |
| host_app_ver  | string   | 宿主App版本                  |
| host_os       | string   | 宿主平台，Android/iOS       |
| host_os_ver   | string   | 宿主平台版本号            |
| network       | string   | 终端网络状态               |
| sdk_ver       | string   | 小程序SDK版本               |
| version_code  | int      | 当前客户端Sailor VersionCode |
| version_name  | string   | 当前客户端Sailor VersionName |
| abi_type      | string   | CPU架构                        |

##### 返回参数 

| 参数            | 数据类型 | 说明                                     |
| ----------------- | -------- | ------------------------------------------ |
| errno             | int      | 错误号，0-表示成功，1010-当前已经是最新包 |
| errmsg            | string   | 错误描述信息                         |
| tipmsg            | string   | 错误描述信息，用于直接提示给用户 |
| data              | object   | 数据字段，当errno不为0的时候，该字段值为null |
| data.bundle_id    | string   | 包唯一标识                            |
| data.version_name | string   | 包版本号，string型，格式1.2.3     |
| data.version_code | int      | 包版本号，int型                      |
| data.size         | int      | 包大小，单位byte                     |
| data.md5          | string   | 包md5                                     |
| data.download_url | string   | 包下载地址                            |

示例：

```
{
    "errno":0,
    "errmsg":"success",
    "tipmsg":"请求成功",
    "data":{
        "bundle_id":"sailor",
        "version_name":"1.0.0",
        "version_code":100,
        "size":381575,
        "md5":"6aa84bcf7011c228866d309e7f7",
        "download_url":"https://b.bdstic.com/0352eba74839fc661e2ab8fcd.zip"
    }
}
```

### 小程序小游戏用到的SO库说明
| so库             | 说明                                     |
| ----------------- |  ------------------------------------------ |
|libv8.engine.so |小游戏引擎，运行小游戏必备（其内部依赖了libzeusv8.so）|
|libzeusv8.so | js的v8引擎，运行小游戏和小程序必备|
|libcom.baidu.zeus.so| t7内核和小游戏引擎需要的资源文件，必备|
|libzeuswebviewchromium.so| T7内核文件，同层渲染必备（这个so是经过7z压缩的，需要配套libzeuslzma.so使用）|
|libzeusplat_support.so| T7内核的支持文件，必备|
|libzeuslzma.so| 7z解压缩库，用于将libzeuswebviewchromium.so 解压|
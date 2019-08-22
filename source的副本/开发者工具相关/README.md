
# 开发者工具宿主接入文档
##背景

开发者工具扩展提供宿主在开发者工具内的最小集、端能力的实现，小程序开发者在开发者工具内的宿主环境调试时，是必须要宿主方实现的功能。

## 常用路径

**vendor文件夹地址** 

开发者工具的资源目录，不同系统和工具版本不一致，具体规则如下：

- windows(%USERPROFILE%是你的用户目录)
    - 2.5.2以及之前版本
        - 正式版本：  `%USERPROFILE%\.swan-cli\vendor`  
    - 2.6.0以及之后版本
        - 正式版本：  `%USERPROFILE%\AppData\Roaming\百度开发者工具\cli\vendor`  
        - beta 版本：   `%USERPROFILE%\AppData\Roaming\百度开发者工具-beta\cli\vendor`
        - rc 版本：   `%USERPROFILE%\AppData\Roaming\百度开发者工具-rc\cli\vendor`
- mac
    - 2.5.2以及之前版本
        - 正式版本：  `~/.swan-cli/vendor`  
    - 2.6.0以及之后版本
        - 正式版本： `~/Library/Application Support/百度开发者工具/cli/vendor`
        - beta版本： `~/Library/Application Support/百度开发者工具-beta/cli/vendor`
        - rc版本： `~/Library/Application Support/百度开发者工具-rc/cli/vendor`
    
    
**日志文件地址** 

- windows (%USERPROFILE%是你的用户目录)
    - 正式版本：  `%USERPROFILE%\AppData\Roaming\百度开发者工具\log.log`
    - beta 版本：   `%USERPROFILE%\AppData\Roaming\百度开发者工具-beta\log.log`
    - rc 版本：   `%USERPROFILE%\AppData\Roaming\百度开发者工具-rc\log.log`
- mac
    - 正式版本： `~/Library/Logs/百度开发者工具/log.log`
    - beta版本： `~/Library/Logs/百度开发者工具-beta/log.log`
    - rc版本： `~/Library/Logs/百度开发者工具-rc/log.log`

**命令行启动命令**

对于 beta/rc 版本，需要在目录和可执行文件的名字 开发者工具/swan-ide-gui 后面，添加 -beta/-rc 
    
- windows
    - 快捷方式：在后面添加 `--host --console` 参数来启动工具 【推荐】
    - cmd： `${安装目录}\百度开发者工具.exe --host --console` 
    完整命令类似  `%USERPROFILE%\AppData\Local\Programs\swan-ide-gui\百度开发者工具.exe --host --console` 
- mac 
    - `${安装目录}/百度开发者工具.app/Contents/MacOS/百度开发者工具 --host --console` 
    完整命令类似 `/Applications/百度开发者工具.app/Contents/MacOS/百度开发者工具 --host --console`


## 快速开始

要实现一个新的APi,需要在开发者工具模拟器扩展中添加一个api的实现,同时在框架的 extensionJs 中添加一个新的api描述。下面简述如何快速添加一个api

- 安装2.2.4以上版本的开发者工具
- 下载文档内的 demo 目录代码
- 到 vendor 文件夹下，创建 demo-program-extension 目录，并复制 demo 内的extensionJs/1.0.0 到目录中。
复制后的目录结构如下：

```
└── vendor 
        └── demo-program-extension    
                    └──  1.0.0
                           ├──  extension.js
                           └──  extension.css
```
    
- 通过上面提供的命令行方式打开开发者工具 【一定要通过命令行加参数打开】
- 打开一个小程序工程，在工具栏中打开宿主配置管理中心，选择加载本地宿主，打开demo/ide/demo目录，关闭宿主配置管理中心，切换成示例APP宿主
- 等待编译完成后,在调试器 console 中输入`swan.demo.demo({data:{test: 1},success:console.log})`,可以看到输出了api中返回的内容。

ps：如果开发其他本地宿主，将目录和配置中的demo替换成你自己的宿主名。

## 接入流程图
- ![流程图](assets/flow.png)
## 详细说明 
   - [如何开发和调试](开发和调试.md)
   - [如何增加宿主配置](增加宿主配置.md)
   - [如何开发模拟器扩展](开发模拟器扩展.md)
     - [开发一个api扩展](api扩展.md)
     - [开发一个组件扩展](组件扩展.md)
   - [使用demo](demo.md)
 



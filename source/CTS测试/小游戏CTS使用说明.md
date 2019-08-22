# 自动化CTS测试

## 宿主测试环境

使用debug版本的宿主app

提供scheme调起小游戏&小程序入口

## 安装CTS测试环境

### 根据操作系统版本下载对应的sgt版本

| 系统    | sgt版本     |
| ------- | ----------- |
| linux   | sgt-linux   |
| mac     | sgt-macos   |
| windows | sgt-win.exe |

修改sgt权限，保证sgt具有可执行权限。

### 配置全局环境变量sgt

环境变量配置方法参见 [https://baike.baidu.com/item/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F](https://baike.baidu.com/item/环境变量)

### 检查是否安装成功

```shell
sgt --help
```

预期输出

![](http://ww4.sinaimg.cn/large/006tNc79ly1g4kffapyyyj31400miad7.jpg)

## 运行测试用例

### 选择测试用例版本

```powershell
# 在swan-game-cts中根据集成SDK版本选择用例版本
# sdk与swan-game版本映射关系
# 2.5.0 <———>1.7.X
# 2.5.3 <———>1.7.X
# 2.6.0 <———>1.8.X
# 2.7.0 <———>1.9.X
cd swan-game-cts
git checkout release-X.X.X
```

### 设置debug配置项

配置appKey

```powershell
# 在swan-game-cts 工程下根目录创建swan-appkey文件
cd swan-game-cts
touch swan-appkey
# 将小游戏的appkey写入swan-appkey文件
echo "kYgTkh67HPwvWRl12enuGrnSrpBQL6Up">>swan-appkey
```

使用开源宿主调试工具配置debugConfig

![](http://ww3.sinaimg.cn/large/006tNc79ly1g5lbpq8jehj3046046t8i.jpg)

appKey: QVgDrpPPg8G3jzwm8NafW3vxWnR4CN4d_dev496

开启「请求不校验https」、「域名校验豁免」、「小游戏支持本地包调起」三个开关

设置host为本地ip地址、port为"8123"

### 执行测试用例

```powershell
cd swan-game-cts
# 「sgt」为配置好的全局环境变量
# 「协议头」由宿主自定义
# 执行IO类的case(执行 src/autoCaseIndex.js 中的所有测试用例)
sgt test --scheme-protocol 协议头
# 执行UI类的case(执行 src/manualCaseIndex.js 中的所有测试用例)
sgt test --entry manual --scheme-protocol 协议头
# 执行广告的case(执行 src/adCaseIndex.js 中的所有测试用例)
sgt test --entry ad --scheme-protocol 协议头
```



### 测试结果页介绍

![](http://ww3.sinaimg.cn/large/006tNc79ly1g4kfmfybexj30n80jntht.jpg)

## 常见问题

1. 提示检查https

   没有开启「请求不校验https」、「域名校验豁免」

2. 运行sgt test 报错命令不存在

​       sgt没有可执行权限，修改macos-sgt权限，使其具有可执行权限

​       sgt全局环境变量未生效，检查环境变量配置

3. 运行sgt test报错

​       根据报错信息排查

# 手动CTS测试

部分API无法通过自动化测试覆盖，因此提供手动测试用例

## 使用方法

扫二维码打开百度小游戏CTS测试用例

![](http://ww3.sinaimg.cn/large/006tNc79ly1g5lbnvp3l6j30bq0bqwg6.jpg)

appKey: kYgTkh67HPwvWRl12enuGrnSrpBQL6Up_dev8667

## 测试建议

各版本SDK均不需关注

* 手动测试用例->开放接口->客服消息

SDK版本低于2.6.0不需关注

* 手动测试用例->设备->转屏

* 手动测试用例->系统->生命周期->swan.reload

* 手动测试用例->界面->添加到桌面引导



接口人：王文翰

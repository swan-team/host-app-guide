<!-- TOC -->

- [1. Util](#1)
    - [1.1. 文档版本](#11)
    - [1.2. 功能说明](#12)
    - [1.3. 开发指南](#13)
        - [1.3.1. 协议](#131)
        - [1.3.2. 接口列表](#132)
        - [1.3.3. 示例](#133)

<!-- /TOC -->
# <span id="1"> 1. Util
## <span id="11"> 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-10|初始版本|
|2.7.0|2019-06-12|Adapter协议优化|

--------------------------
## <span id="12"> 1.2. 功能说明
小程序基础工具：包压缩（必须实现，小程序包解压需要）

## <span id="13"> 1.3. 开发指南
### <span id="131"> 1.3.1. 协议
Util协议：BBASMUtilAdapterProtocol

### <span id="132"> 1.3.2 接口列表

@required

```
/**
 * @brief ⚠️：小程序解压接口(必须实现)，解压成功，bUnzip为YES，解压失败，bUnzip为NO，errorDetail为自定义解压错误
 * @param souPath 被压缩文件路径，文件压缩格式：zip
 * @param desPath 压缩文件路径
 * @param finishedBlock 压缩完成回调
 */
+ (void)unzipFilePath:(NSString *)souPath
    toDestinationPath:(NSString *)desPath
        finishedBlock:(void (^)(BOOL bUnzip, NSString * _Nullable errorDetail))finishedBlock;
        
```

### <span id="133"> 1.3.3 示例
参考：BBASMUtilImplement

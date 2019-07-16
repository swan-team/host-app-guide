<!-- TOC -->

- [1. Util](#1-util)
    - [1.1. 文档版本](#11-文档版本)
    - [1.2. 功能说明](#12-功能说明)
    - [1.3. 开发指南](#13-开发指南)
        - [1.3.1. 协议](#131-协议)
        - [1.3.2. 接口列表](#132-接口列表)
        - [1.3.3. 示例](#132-示例)

<!-- /TOC -->
# 1. Util
## 1.1. 文档版本

|文档版本|修改日期|修改概述|
|:--|:--|:--|
|0.8|2018-12-10|初始版本|
|2.7.0|2019-06-12|adapter协议优化|

--------------------------
## 1.2. 功能说明
小程序基础工具
## 1.3. 开发指南
### 1.3.1. 协议
BBASMUtilAdapterProtocol
### 1.3.2 接口列表

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
@optional

```
/**
 * @brief 通过机器学习的方式来检测是否是白屏
 * @param snapShot 检测的图片
 * @param completionBlock 检测完成的返回值
 */
+ (void)whiteScreenDetectedByML:(UIImage *)snapShot
                completionBlock:(void (^)(BOOL, NSDictionary *_null))completionBlock;
                
```
### 1.3.3 示例
参考：BBASMUtilImplement

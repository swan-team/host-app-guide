# 什么是CTS测试
宿主在接入智能小程序SDK后，部分端能力的实现由宿主侧开发实现。上线前通过CTS验证，能够保证相关的底层能力实现符合预期，进而保证在百度App上的小程序也能够同样运行在宿主的运行环境上。

# 两种CTS形态用例
##【手动】CTS智能小程序
在您的宿主App上通过扫码或者adb等方式启动并加载CTS智能小程序。根据页面提示进入您需要校验能力对应的用例页面，并根据页面提示完成相关操作查看运行结果。

##【自动化】基于Bat引擎的Mocha脚本
在您的电脑上完成对应环境的配置后，能够运行自动化脚本。需要注意的是，自动化测试用例当前支持的能力覆盖度约70%，即使您选择自动化用例，也同样有一小部分需要用小程序方式进行校验。
当前只支持Android，iOS方案开发中

## 方案选择推荐
当宿主首次接入时，建议通过CTS智能小程序通过页面进行功能联调&自测，这样会极大提升您的使用效率。验证通过后再通过自动化测试对整体能力进行回归。

# CTS智能小程序说明
通过在宿主App上利用调起协议或扫码打开CTS智能小程序，根据页面提示校验页面效果是否符合预期。

## CTS智能小程序AppKey
PccCNGKCYawUcfCxivhfmTEuCICGK0IX_trial

## CTS智能小程序调起协议
宿主协议头://swan/PccCNGKCYawUcfCxivhfmTEuCICGK0IX_trial

## 打开方式
 - 【Android】通过adb命令 `adb shell am start -d 调起协议`，打开对应小程序
 - 【iOS】将调起协议复制到Safari浏览器中，根据提示点击确定调起CTS智能小程序

# CTS智能小程序使用说明
![](http://agroup-bos.cdn.bcebos.com/25c4c533eeb26e14f625aa1b2d0fe10b9adec7f6)

CTS智能小程序共有如下3个Button：

## 宿主实现能力集用例
这部分用例对应内容为宿主自身实现的相关功能，需要宿主同学需要重点关注。无论对应用例是否支持自动化，相关API能力都在这里列出；
## SDK实现手动用例
这部分用例对应内容由SDK实现，由于这部分内容涉及音视频等相关内容无法被自动化校验，因此用例需要手动执行。宿主同学需要按照页面操作验证以便保证宿主的相关修改并没有影响到SDK原有功能；
## 可自动化测试用例
这部分内容由SDK实现，自动化用例中已对对应功能进行验证。如果您已通过Mocha自动化用例，您就无需在关注这里面的内容。

# Mocha自动化操作步骤指南
## 自动化用例下载地址
自动化用例请在“开源联盟宿主平台-CTS模块”进行下载，地址：https://ossunion.baidu.com/opensource/index.html

##【宿主App相关】宿主App开启调试模式
 -  在SDK 2.5.0以上版本中，无需对源码进行特殊操作，可以通过扫描二维码的方式来开启
	 - 二维码地址：
	 ![](http://agroup-bos.cdn.bcebos.com/94516012ebf2dc8fcb9d2c90742ac803d24256a6)
 -  打开调试小程序后，开启“加载CTS性能测试”、“请求不校验https”与“域名校验豁免”开关，并重启手机后。再次进入任何小程序，左上角会有红色文案标识。
	 ![](http://agroup-bos.cdn.bcebos.com/4b77f5741646ee24fdbf8b9aa8619c816695aa3b)

##【运行手机相关】运行手机需要完成如下几步操作
 - 手机打开”开发者选项”与电脑进行连接，通过adb devices与能够看到已与电脑相连的设备列表
 - 手机开启“模拟点击”功能，以便CTS自动化测试能够对您的手机进行操作点击
 - 宿主App需要在登录状态下进行校验
 - CTS智能小程序在宿主App的全部权限（如摄像头权限、地理位置权限）都需要允许使用

##【电脑环境相关】电脑上的bat-agent安装与启动
 - 安装运行所需相关全局变量（bat-agent、mocha、mochawesome）
	 - 指令：npm install -g bat-agent
	 - 指令：npm install -g mocha
	 - 指令：npm install -g mochawesome
	 - 	注：如果您的电脑之前没有安装过node或者npm等相关内容，运行这些命令无法成功时，请百度查找相关报错内容进行对应内容的修复。
 -  确认手机与电脑已通过adb连接成功
	 - 	命令：adb devices；能够看到已连接手机的deviceID
 -  启动bat-agent
	 - MAC设备启动命令：bat
	 - Win设备启动方法，进入bat-agent安装目录，执行npm run start
	 - 执行完毕后，展示【BAT Engine start at port of 8090】表示环境搭建完成。

##【自动化工程相关】自动化测试工程的启动
 -  安装测试用例依赖
	 - 进入用例cts目录中，安装相关依赖
		 - 指令：npm install
 -  确认注册宿主协议头与包名对应关系
	 - 每个宿主需要在代码中维护协议头与包名的映射关系，以便自动化测试能够进行元素定位。
		 - 首次接入时请确认satAutoCase/util/property.js中的“SCHEME_HEAD”变量已维护您宿主的schemeHead与包名映射，数据来源取自宿主平台；如有异常或变更请在宿主平台进行设置或进行反馈
 -  修改宿主运行环境配置
	 - 修改satAutoCase/env.js文件中的“APP”变量为宿主的schemeHead，已调起对应宿主App
	 - 修改satAutoCase/env.js文件中的“BAIDU_COMPANY”布尔变量，设置为false中将会过滤掉用例中的私有API参数校验
	 - 修改satAutoCase/env.js文件中的“API_LIST”中可选API能力集是否支持，设置为false的API对应用例将在执行时被跳过
 -  配置宿主实现Android相关控件的元素定位
	 - 在由宿主开发实现的相关模块上（如图片查看器等），元素的对应xpath由宿主自行实现。自动化用例已经前置填好操作步骤，宿主的控件定位需要通过UIAutomatorViewer工具进行查看，并配置在satAutoCase/util/naElement.js文件中。
	 - 当前需要宿主自行配置的客户端元素包括：
		 - 图片查看器相关
			 - CHOOSEIMAGE_IMAGE,可以选中图片选择器里一张图片的元素定位
			 - CHOOSEIMAGE_CONFIRM_BUTTON,图片选择器的“确定”按钮元素定位
			 - CHOOSEIMAGE_CANCEL_BUTTON,图片选择器的“取消”按钮元素定位
		 - 地理位置（openLocation与chooseLocation）相关
			- OPENLOCATION_BACK_BUTTON,openLocation的“返回”按钮元素定位
			- CHOOSELOCATION_CONFIRM_BUTTON, chooseLocation的“确定”按钮元素定位
			- CHOOSELOCATION_CANCEL_BUTTON, chooseLocation的“取消”按钮元素定位
		 - 发票抬头和收货地址相关
			- CHOOSEINVOICETITLE_CONFIRM_BUTTON, chooseInvoiceTtile的“确定”按钮元素定
			- CHOOSEINVOICETITLE_CANCEL_BUTTON, chooseInvoiceTtile的“取消”按钮元素定
			- CHOOSEADDRESS_CONFIRM_BUTTON, chooseAddress的“确定”按钮元素定
			- CHOOSEADDRESS_CANCEL_BUTTON, chooseAddress的“取消”按钮元素定位
 - 确认环境已经调通的标志
	 - 【mocha -t 180000 satAutoCase/case/swan-api/showModal.js 】，执行后对应case全部通过，标志除宿主自实现Android控件元素定位的其他环境已全部通过
	 - 【mocha -t 180000 satAutoCase/case/swan-api/chooseImage.js 】，执行后对应case全部通过，标志宿主自实现Android控件元素定位（此处以图片查看器代表宿主开发的Native实现相关功能）也已全部通过。

 - CTS用例批量运行方法
	 - MAC运行指令：npm run cts
	 - Windows运行指令：npm run ctswin
 - 本环节大约持续15-30分钟，运行完后会整体产出测试报告，运行时终端展示如下图：
![](http://agroup-bos.cdn.bcebos.com/7d0f948f33896f556a5f52923630f700dba6fdf9)

 - 测试报告查看
	 - case完成后，测试报告会产生在case目录的mochawesome-report文件夹下，效果如下图
	 ![](http://agroup-bos.cdn.bcebos.com/cb18a8baf27b12752ca1bd417812243527e1a987)
		 - 注：由于批量运行case数量1300+，运行过程中可能会存在少量case误报的问题。可如下图获取失败case运行路径，通过指令【mocha -t 180000 ${path} 】来进行case的单步调试，确定是否存在问题
		   ![](http://agroup-bos.cdn.bcebos.com/8843d2b71b5e03cc1c82a94f0bc03093be24eabd)

# 联系方式
未尽事宜，请联系百度智能小程序CTS负责人：丛凤翔 （18611324798）


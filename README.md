/*
* Hello-ui v2.3.5 (https://github.com/749264345/hello-ui)
* Copyright 2015-2016 Jnst.
* E-mail : 749264345@qq.com
* http://www.hello-ui.com
*/

v 1.0.1	无缝轮播悬停问题
v 1.1.0	新增图片裁剪插件[jquery.helloclip.js]
v 1.2.0	新增自定义滚动条插件[jquery.helloscroll.js]
				添加lib目录
				规范js代码，统一换行缩进改为Tab
v 2.0.0	全局对象hello
				$.hello(plugName,param);  //封装插件
				$.helloPlug.prototype.autoComplete = function(param){}; //扩展
v 2.1.1	扩展工具：生成随机色
				扩展插件：基于canvas纯前端实现验证码验证
v 2.2.0	扩展插件：小提示 tip
v 2.2.1	优化主页面
v 2.2.2  修复jQuery获取当前文件路径的问题
				扩展$.hello('path'); //获取当前文件路径
v 2.3.0  扩展内置方法
				 格式化当前时间，年月日-时分秒-毫秒 - 时间戳 - 星期 - 季度
				 $.hello('backToTop');  一键调用回到顶部
				 $.hello('isLeapYear'); 判断指定某年是否为闰年
v 2.3.1  提供压缩版本				 
v 2.3.2  优化hello-clip 图片转base64后执行裁剪				 
v 2.3.3  优化hello-scroll 窗口改变大小时的响应				 
v 2.3.4  扩展hello-button插件				 
v 2.3.5  修复hello-scroll 多个滚动条生成的问题	 
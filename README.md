/*
* Hello-ui v2.7.5(https://github.com/749264345/hello-ui)
* Date:2017/06/23
* Copyright 2015-2017 祝宇(Jnst)
* From China
* E-mail : 749264345@qq.com
* http://www.hello-ui.com


# 1.0.1	无缝轮播悬停问题
# 1.1.0	新增图片裁剪插件[jquery.helloclip.js]
# 1.2.0	新增自定义滚动条插件[jquery.helloscroll.js]
 				添加lib目录
 				规范js代码，统一换行缩进改为Tab
# 2.0.0	全局对象hello
 				$.hello(plugName,param);  //封装插件
 				$.helloExtend.prototype.autoComplete = function(param){}; //扩展
# 2.1.1	扩展工具：生成随机色
 				扩展插件：基于canvas纯前端实现验证码验证
# 2.2.0	扩展插件：小提示 tip
# 2.2.1	优化主页面
# 2.2.2  	修复jQuery获取当前文件路径的问题
 				扩展$.hello('path'); //获取当前文件路径
# 2.3.0  	扩展内置方法
 				格式化当前时间，年月日-时分秒-毫秒 - 时间戳 - 星期 - 季度
 				$.hello('backToTop');  一键调用回到顶部
 				$.hello('isLeapYear'); 判断指定某年是否为闰年
# 2.3.1  	提供压缩版本				 
# 2.3.2  	优化hello-clip 图片转base64后执行裁剪				 
# 2.3.3  	优化hello-scroll 窗口改变大小时的响应				 
# 2.3.4  	扩展hello-button插件				 
# 2.3.5  	修复hello-scroll 多个滚动条生成的问题	 
# 2.5.1  	优化path返回值
 				建立debug，返回页面当前执行$.hello()方法相关信息
 				删除部分冗余方法
 				*删除未压缩版本
# 2.5.5  	表单字数控制工具，调整插件归属		  
# 2.5.7  	优化	  
# 2.6.0  	hello-carousel 增加垂直方向轮播 
# 2.6.1  	修复弹窗拖拽问题
# 2.6.2  	修改优化部分样式
# 2.7.0  	轮播添加鼠标手势拖拽
# 2.7.1	更新canvas插件,添加运算验证；更新主程序压缩
# 2.7.2	主程序报错拦截；添加数据表组件；
# 2.7.3	更新主程序 $.hello([方法],[参数/null],[Boolean]);
				整合原dialog与tip为多模对话框，支持拖拽，ajax，支持回调函数
# 2.7.5	优化				

*/
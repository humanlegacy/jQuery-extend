# 欢迎使用 Hello-ui组件
基于jQuery面向对象开发，多模、兼容、流畅，立即开启$.hello之旅！ 您可以免费使用下列组件：

> * 无缝轮播组件
> * 模态框
> * 下拉集成全国三级联动
> * 按钮组件

> version 2.7.7 / 2017-06-25

## 目录结构
hello-ui前端组件是基于`jQuery-2.2.3.min.js`开发，简单易用。
部分组件依赖于其他组件，具体请在实例页面查看相关页面源代码。
```javascript
/*目录结构*/
hello-ui
    ├ libs                                 //组件依赖库,jQuery库
    ├ extend                               //扩展目录
    ├ hello-ui.min.css                     //样式文件
    ├ jquery.hello-ui.min.js               //主程序
```
## 扩展
在hello-ui基础上自定义扩展组件
```javascript
;(function($) {
    $.helloExtend.prototype.getColor = function(param){
        //这里是您的代码···
    }
})(jQuery);   
```
调用您扩展的组件
```javascript
$.hello('getColor',param);
```
## 高级使用

1.在您的页面中引入`hello-ui.min.css` 与 `jquery.hello-ui.min.js` 即可随意调用组件中的组件与内置方法;
```javascript
$.hello('_loadExt',['dialog']);    
//调用dialog组件，传递数组
```

2.在传入第三个参数来调试您的代码。你可以发现组件调用具有一定格式：`$.hello([方法],[参数/null],[Boolean]);`具有3个参数，第一个为调用的组件名称（必填），第二个是传入组件的参数（选填），第三个是组件调试，当调用的组件需要调试时，请传入布尔值true，按F12在控制台你可以看到调试结果。

如果需要调试的组件没有可传入的参数，请为第二个参数传入null。
```javascript
$.hello('dialog',{width:500},true);    
//返回页面中正在执行的$.hello()方法，以及其执行所用的时间，单位为毫秒。

//该方法没有相关参数时，第二个参数必须传入null;
$.hello('dialog',null,true);
```
## 内置方法
| 方法        | 使用说明   | 
| --------      | -----:          | 
| \$.hello("_date","Y-M-D(d)(周W,第Q季度) h:m:s:S 时间戳:T");| 返回当前格式化时间 |  
| \$.hello('_path');|返回当前JS文件路径和所在目录|
|\$.hello('_randArr',["red", "blue", "yellow", "green"]);	|随机获取数组中某一项|
|\$.hello('_rand',[1,5]);|	生成指定范围内的随机数|
|\$.hello('_getNum',[11,5,8,0,-3,7]);	|返回数组中的最大值和最小值|
|\$.hello('_remove',{array:["red", "blue", "yellow", "green"],del:'green'});	|删除数组中指定元素|
|\$.hello('_getStr',5);	|返回随机生成指定长度的数字字母组合|
|\$.hello('_randColor');	|返回16进制随机色|
|\$.hello("_backToTop",{speed:300,onLive:true,onShow:50});	|在页面中插入一个返回顶部的按钮，参数可选，向上滚动速度，是否持续显示按钮，显示按钮时的滚动条高度|
|\$.hello('_drag',{target:'.box',trigger:'.title',startCallBack:function(e){},moveCallBack:function(e){},endCallBack:function(e){}});|	使元素可拖拽并自动适配移动端，target为移动容器，trigger为触发容器,并具有三个回调函数，分别为点击触发容器时，拖拽中以及释放拖拽，回调函数均可接收event事件对象|

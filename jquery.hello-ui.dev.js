/*
 * Hello-ui v2.7.5 (https://github.com/749264345/hello-ui)
 * auth:Jnst.
 * Copyright 2015-2017 
 */
;(function($,window,document,undefined){
	"use strict";
	
	//获取当前文件的文件路径与文件所在目录
	var filePath = $("script").last().attr("src"),
			folderPath = filePath.substr (0,(filePath.indexOf('.')-6)),
			source;
	
	//判断是否为对象内方法
    function isFn(fnName){
		if(source[fnName] === undefined){
			console.log("Error:" + fnName +' is not defined!');
			return false;
		};
		return true;
	};
	
	//创建deBug调试方法	
	function deBugFn(source,fnName,param){
		var result = {},handler,START,END;
		if(isFn(fnName)){
			START = new Date().getTime();
			handler = source[fnName](param);
			END = new Date().getTime();
			result[fnName] = (END - START) + 'ms';
			console.log(result);
			return handler;
		}
	};	
		
	$.helloExtend = function(){};
	$.extend({
		hello:function(fnName,param,deBug){
			source = $.extend({},hello,$.helloExtend.prototype);
			if(deBug){
				return deBugFn(source,fnName,param);
			}
			return source[fnName](param);
		}
	});
	var hello =  {
		//获取文件路径
		_path:function(){
			return {
				filePath:filePath,
				folderPath:folderPath
			};
		},
		//同步加载组件
		_loadExt:function(arr){
			var path = $.hello('_path');
			for(var i in arr){
				var plugPath = path.folderPath + '/extend/jquery.hello-'+arr[i]+'.js';	
				$.ajax({url: plugPath,async: false,dataType: "script"});	
			}
		},
		//判断客户端是否为PC
		_isPc:function(){
			var userAgentInfo = navigator.userAgent;  
			var Agents = ["Android", "iPhone","Windows Phone", "iPad", "iPod"];  
			var flag = true;  
			for (var v = 0; v < Agents.length; v++) {  
				if (userAgentInfo.indexOf(Agents[v]) > 0) { 
					flag = false; 
					break; 
				}  
			}  
			return flag;  
		},
		//随机获取数组中某一项
		_randArr:function(arr){
			return arr[Math.floor(Math.random() * arr.length)];
		},
		//生成指定范围内的随机数
		_rand:function(arr){
			return Math.floor(Math.random() * (arr[0] - arr[1] + 1)) + arr[1]; 
		},
		//返回数组中的最大值和最小值
		_getNum:function(arr){
			return {
				max : Math.max.apply(Math, arr), 
				min : Math.min.apply(Math, arr)
			};
		},		
		//删除数组中指定元素
		_remove:function(obj){
			for(var k in obj.array) {
				if(obj.array[k] == obj.del) {
				  obj.array.splice(k, 1);
				  break;
				}
			  }
			  return obj;
		},
		//返回随机生成指定长度的数字字母组合
		_getString:function(num){
			var rdmStr = "";  
			if(rdmStr.length < num) rdmStr  += Math.random().toString(36).substr(2);
			return  rdmStr.substr(0, num);  
		},
		//返回16进制随机色
		_randColor:function(){
			return "#"+((Math.random()*(0xFFFFFF).toString(10)).toString(16)).slice(-6); 
		},
		//格式化时间："Y-M-D(d)(周W,第Q季度) h:m:s:S 时间戳:T"
		_date:function(str){
			var D=new Date(),
				item = {
					"Y": D.getFullYear(),
					"M": D.getMonth() + 1,
					"D": D.getDate(),
					"h": D.getHours(),
					"m": D.getMinutes(),
					"s": D.getSeconds(),
					"d": new Date(2016,12,0).getDate(),
					"Q": Math.floor((D.getMonth() + 3) / 3), 
					"S": D.getMilliseconds(), 
					"W":"日一二三四五六".charAt(D.getDay()), 
					"T":D.getTime()
				};
			for (var k in item){
				new RegExp("(" + k + ")").test(str) ? str = str.replace(RegExp.$1, item[k]) : null;
			}
			return str;
		},
		//返回顶部
		_backToTop:function(param){
			var defaults = {speed:300,onLive:true,onShow:50},opts = $.extend({},defaults,param);
			$('body').append('<span id="hello-top"><i class="icon-arrow-up"></i></span>');
			$('#hello-top').on('click',function(){
				$('body').animate({scrollTop:0},opts.speed);
			});
			if(!opts.onLive){
				$('#hello-top').hide();
				$(window).scroll(function(){
					var scrollTop = $(this).scrollTop();
					scrollTop >= opts.onShow ? $('#hello-top').show() : $('#hello-top').hide();
				});
			}
		},
		/*内置，供插件使用*/
		_mScroll:function(o){
			$(document).on('mousemove',o,function(e){
				var h = $(this).height(),
					$slide = $(this).children(),
					m = $slide.height() - h,
					st = e.clientY - $(this).offset().top + $(window).scrollTop(),
					y = st - h * 0.2 * (0.5 - st / h);
				$slide.css({'position':'relative','top': -y / h * m});
			});
			$(document).on('mouseleave',o,function(e){
				var $slide = $(this).children(),
						h = $(this).height(),
						m = $slide.height() - h;
				if (parseInt($slide.css('top')) > 0) {
					$slide.animate({'top': 0}, 300);}
				if (-parseInt($slide.css('top')) > m) {
					$slide.animate({'top': -m}, 300);}
			});	
		},	
		//元素可拖拽
		_drag:function (obj) {
			var touchEvents = {};
			$.hello('_isPc') ? touchEvents = {touchstart: "mousedown",touchmove: "mousemove",touchend: "mouseup"}
										 : touchEvents = {touchstart: "touchstart",touchmove: "touchmove",touchend: "touchend"};
			
			var $this = $(obj.target),width = $(window).outerWidth(),height = $(window).outerHeight();
			$(obj.trigger).bind(touchEvents.touchstart, function(e) {
				e.preventDefault();
				if(obj.startCallBack){
					obj.startCallBack(e);
				}
				function getPos(e){
					if($.hello('_isPc')){
						return {x:e.clientX,y:e.clientY};
					}else{
						return {x:e.originalEvent.targetTouches[0].pageX,y:e.originalEvent.targetTouches[0].pageY};
					}
				}
				var pos = getPos(e);
				var startX = pos.x - $this.offset().left,
					  startY = pos.y - $this.offset().top,
					  scrollTop = $(window).scrollTop(),
					  dialogWidth = $this.width(),
					  dialogHeight = $this.height(),
					  maxLeft = width - dialogWidth,
					  maxTop = height - dialogHeight + scrollTop;
				$(window).bind(touchEvents.touchmove, function(e) {	  
					e.preventDefault();
					if(obj.moveCallBack){
						obj.moveCallBack(e);
					}
					var pos = getPos(e);
					$this.css({
						'position':'fixed',
						'left': pos.x - startX,
						'top': pos.y - startY - scrollTop,
						'margin': 0
					});
					if ($this.offset().left > maxLeft) {
						$this.offset({'left': maxLeft});
					}
					if ($this.offset().left < 0) {
						$this.offset({'left': 0});
					}
					if ($this.offset().top > maxTop) {
						$this.offset({'top': maxTop});
					}
					if ($this.offset().top < scrollTop) {
						$this.offset({'top': scrollTop});
					}
				});
			}).bind(touchEvents.touchend, function(e) {
				if(obj.endCallBack){
					obj.endCallBack(e);
				}
				$(window).unbind(touchEvents.touchmove);
			});
		}

	};	
	
})(jQuery,window,document);
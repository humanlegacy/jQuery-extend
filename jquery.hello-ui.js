/*!
 * Hello-ui v2.3.5 (https://github.com/749264345/hello-ui)
 * Copyright 2015-2016 Jnst.
 */
;(function($,window,document){
	if(window.hello){
		return;
	}
	var localPath = $("script").last().attr("src"),Path = localPath.substr (0,(localPath.indexOf('.')-6));
	var deBug = {
		getPlugName:function(){
			for(plugName in $.helloPlug.prototype){
				console.log('已加载扩展方法:'+plugName);
			}
		},
		tools:function(){
			console.log(hello);
		},
		localPath:function(){
			return localPath;
		}
	}
	$.helloPlug = new Function();
	$.extend({
		hello:function(plugName,param,param2){
			var plugin = $.extend({},hello,$.helloPlug.prototype,deBug);	
			return plugin[plugName](param,param2);
		}
	});
	window.hello =  {
		getPlug:function(param){
			if(typeof(param) === 'string'){
				var path = $.hello('path');
				var plugPath = path + '/plugins/jquery.hello-'+param+'.js';	
				$.ajax({url: plugPath,async: false,dataType: "script"});
			}
			if($.isArray(param)){
				for(i in param){
					var plugPath = path + '/plugins/jquery.hello-'+param[i]+'.js';	
					$.ajax({url: plugPath,async: false,dataType: "script"});	
				}
			}
		},
		path:function(){
			return Path;
		},
		mousePos:function(param){
			var x = $(param).offset().left , y = $(param).offset().top,e = window.event,mouse = {};
			return mouse = {
				x : e.clientX - x,
				y : e.clientY - y	
			}
		},
		changeToArray:function(param){
			var tempKey = [],tempVal = [],changeToArray = {};
			for(k in param){
				tempKey.push(k);
				tempVal.push(param[k]);
			}
			return changeToArray = {
				key:tempKey,
				val:tempVal
			}
		},
		delOneVal:function(param,param2){
			for(i in param) {
				if(param[i] == param2) {
				  param.splice(i, 1);
				  break;
				}
			  }
			  return param;
		},
		randomArray:function(param){
			return param[Math.floor(Math.random() * param.length)];
		},
		mOfArray:function(param){
			var temp = {};
			return temp = {
				max : Math.max.apply(Math, param), 
				min : Math.min.apply(Math, param)
			};
		},
		random:function(param){
			return Math.floor(Math.random() * (param[0] - param[1] + 1)) + param[1]; 
		},
		randomStr:function(param){
			var rdmStr = "";  
			if(rdmStr.length < param) rdmStr  += Math.random().toString(36).substr(2);
			return  rdmStr.substr(0, param);  
		},
		randomColor:function(){
			return "#"+((Math.random()*(0xFFFFFF).toString(10)).toString(16)).slice(-6); 
		},
		now:function(param){
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
				new RegExp("(" + k + ")").test(param) ? param = param.replace(RegExp.$1, item[k]) : null;
			}
			return param;
		},
		isLeapYear:function (param) {
			return (param % 400 == 0) || (param % 4 == 0 && param % 100 != 0);
		},
		backToTop:function(param){
			var defaults = {speed:300,onLive:true,onShow:50},
			        opts = $.extend({},defaults,param);
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
		}
	};	
	
})(jQuery,window,document);


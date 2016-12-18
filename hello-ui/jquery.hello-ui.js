;(function($,window,document){
	if(window.hello){
		return;
	}
	var deBug = {
		getPlugName:function(){
			for(plugName in $.helloPlug.prototype){
				console.log('已加载扩展方法:'+plugName);
			}
		},
		tools:function(){
			console.log(hello);
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
		getScript:function(param){
			var pathName = window.document.location.pathname,
				   path = pathName.substring(0, pathName.substr(1).indexOf('/') + 2);
			if(typeof(param) === 'string'){
				plugPath = path + 'hello-ui/plugins/jquery.hello-'+param+'.js';	
				$.ajax({url: plugPath,async: false,dataType: "script"});
			}
			if($.isArray(param)){
				for(i in param){
					plugPath = path + 'hello-ui/plugins/jquery.hello-'+param[i]+'.js';	
					$.ajax({url: plugPath,async: false,dataType: "script"});	
				}
			}
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
		removeOneVal:function(param,param2){
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
		}
	};	
	
})(jQuery,window,document);


$(function(){	
	//加载插件 传递字符串与数组
	//$.hello('getScript',['accordion']);
	
	//获取已加载扩展方法
	$.hello('getPlugName'); 	
	//获取Hello-ui的内置方法
	$.hello('tools'); 	
	
	 //获取鼠标在元素中的位置
	 $(".div1").click(function(){
		 var pos = $.hello('mousePos',$(this));
	 });
	 
	//对象转数组
	var changeToArray  = $.hello('changeToArray',{name:'Peter',sex:'boy',age:32});    
	
	//随机获取数组中某一项
	var randomArray  = $.hello('randomArray',changeToArray.val);  
	
	//生成指定范围内的随机数
	var random = $.hello('random',[1,5]);	
	
	//数组中的最大值和最小值
	var mOfArray = $.hello('mOfArray',[11,5,8,0,-3,7]);	
	
	//删除数组中指定元素
	var na = $.hello('removeOneVal',["red", "blue", "yellow", "green"],'green'); 
	
	//随机生成指定长度的数字字母组合
	var randomStr = $.hello('randomStr',5);	
	
	//随机色
	var color = $.hello('randomColor');
});

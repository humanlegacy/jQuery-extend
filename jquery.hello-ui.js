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
		getPlug:function(param){
            $.hello('getStyle');
			var pathName = window.document.location.pathname,
				   path = pathName.substring(0, pathName.substr(1).indexOf('/') + 2);
			if(typeof(param) === 'string'){
				var plugPath = path + 'hello-ui/plugins/jquery.hello-'+param+'.js';	
				$.ajax({url: plugPath,async: false,dataType: "script"});
			}
			if($.isArray(param)){
				for(i in param){
					var plugPath = path + 'hello-ui/plugins/jquery.hello-'+param[i]+'.js';	
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

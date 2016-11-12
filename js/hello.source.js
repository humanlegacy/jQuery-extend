;(function($, window, document,undefined) {
	
	if (window.Hello) {
		return;
	}
	window.Hello = Hello;
	
   function Hello(options){
	   this.defaults ={
		   lib: [
		   'hello/js/hello.tab.js'
		   ],
		   style:'[hello/css/style.css]'
	   };
	   this.include =options || this.defaults;  
	   this.load();
	   
   }
  
	Hello.prototype.createJS = function(src){
		$.getScript(src,function(response,status){
			if(status == 'success'){
				console.log(src + '载入成功!');
			}
		});
	}
	Hello.prototype.createCSS = function(href){
		var Head = document.getElementsByTagName('head')[0]; 
		var css= document.createElement('link'); 
		css.type = 'text/css'; 
		css.rel = 'stylesheet';
		css.charset = 'utf-8';
		css.href = href;
		Head.appendChild(css); 
	}
	
    Hello.prototype.load = function(){
		for(var js in this.include.lib){
			this.createJS(this.include.lib[js]);
		}
		for(var css in this.include.style){
			this.createCSS(this.include.style[css]);
		}
	

	}


})(jQuery, window, document);



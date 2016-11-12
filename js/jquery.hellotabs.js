;(function($, window, document,undefined) {
	function tabs(ele,opts){
		this.defaults = {
			trigger:'.trigger',
			container:'.container',
			triggerName:['Black','Red','Yellow','White','Green'],
			current:'current',
			autoPlay:false,
			interval:1000,
			event:'mouseover'
		};
		this.opts = $.extend({},this.defaults,opts);
		this.ele = ele;
		this.cont = this.ele.find(this.opts.container);
		this.tabNum = this.cont.children().length;
		this.times = 1;
	}	
	  
	tabs.prototype = {
		 display:function(self){
			if(this.opts.event!='mouseover' && this.opts.event!='click') return;
			this.ele.find(this.opts.trigger).children().bind(this.opts.event,function(){
				 var index  = $(this).index();
				 self.current(index);
			});
			this.ele.hover(function(){
				clearInterval(self.timer);
			},function(){
				if(self.opts.autoPlay){
					var index = self.cont.children(":visible").index();
					self.times = index + 1;
					self.autoPlay(self);
				}
			});
	 },
	 current:function(num){
		this.ele.find(this.opts.trigger).children().eq(num).addClass(this.opts.current).siblings().removeClass(this.opts.current);
		this.cont.children().eq(num).addClass(this.opts.current).siblings().removeClass(this.opts.current); 
	 },
	 autoPlay:function(self){
		if(this.opts.autoPlay){
			  function auto(){
				  self.current(self.times-1);
				  self.times == self.tabNum ? self.times = 1 :  self.times++;
			  }
			 this.timer = setInterval(auto,this.opts.interval);
		 }
	 },
	 init:function(){
		var dom =  '<ul class="'+this.opts.trigger.substring(1)+'">',self = this;
		for(var i = 0; i< this.tabNum;i++){
			dom += '<li>'+this.opts.triggerName[i]+'</li>';
		}
		dom +='</ul>';
		this.ele.prepend(dom);
		this.ele.find(this.opts.trigger).children().first().addClass(this.opts.current);
		this.cont.children().first().addClass(this.opts.current); 
		this.display(self);
		this.autoPlay(self);
	 }
	}

	$.fn.helloTabs = function(opts){
	var fn = new tabs(this,opts);
	return fn.init();
	}
})(jQuery, window, document);
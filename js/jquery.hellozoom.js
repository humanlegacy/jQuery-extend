;(function($, window, document,undefined) {
	function zoom(ele,opts){
		this.defaults = {
			 container:[450,300],
			 glasses:[170,170],
			 scale:2
		};
		this.opts = $.extend({},this.defaults,opts);
		this.ele = ele;
		this.img = $(this.ele).find("img").attr("src");
		this.mt = 0;
		this.ml = 0;
	}	
	zoom.prototype = {
		display:function(){
			$(this.ele).append("<div class='glasses'><img src='"+this.img+"'></div>");	
			$(this.ele).find(".glasses").css({
			   width:this.opts.glasses[0],
			   height:this.opts.glasses[1]
			}).find("img").css({
			   width:this.opts.container[0]*this.opts.scale,
			   height:this.opts.container[1]*this.opts.scale
			});
		},
		move:function(e){
			var $glasses = $(this.ele).find('.glasses');
			var g_w =  this.opts.glasses[0];
			var g_h =  this.opts.glasses[1];
			var w = this.opts.container[0];
			var h =  this.opts.container[1];
			var left =  $(this.ele).offset().left;
			var top =  $(this.ele).offset().top;
			var mx = e.pageX - left;
			var my = e.pageY - top;
			$glasses.css({top:my - g_h/2,left:mx - g_w/2});
			if( mx > 0 && my > 0 && mx < w&& my < h ){
				$(this.ele).find(".glasses").fadeIn(150);
			}else{
				$(this.ele).find(".glasses").fadeOut(150);
			}
			this.ml = - Math.round( mx / w * w * this.opts.scale - g_w / 2);
			this.mt = - Math.round( my / h * h * this.opts.scale - g_h / 2);
		},
		init:function(){
			var self = this;
			this.display();
			 $(this.ele).css({
				 width:self.opts.container[0]+'px',
				 height:self.opts.container[1]+'px'
			 });
			$(this.ele).mousemove(function(e){
				self.move(e);
				$(this).find(".glasses>img").css({
					 'top':self.mt , 'left':self.ml
				});
			});	
		}
	} 
	$.fn.helloZoom = function(opts){
		var fn = new zoom(this,opts);
		return fn.init();
	}
})(jQuery, window, document);
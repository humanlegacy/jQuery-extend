;(function($, window, undefined) {
	function Carousel(ele, opts) {
		this.defaults = {
			size:'fullScreen',
			//size:[700,350],
			startIndex:0,
			horVertical:true,
			arrow: true,
			arrowText:["Prev","Next"],
			dots: true,
			autoPlay: false,
			interval: 3000,
			onLeave: function(index) {},
			onEnter: function(index) {}
		};
		this.opts = $.extend({},this.defaults, opts);
        this.ele = ele;
		this.index = this.oldindex = this.opts.startIndex;
		this.container = $(this.ele); 
		this.item = this.container.find('.carousel-item');
		this.opts.size === 'fullScreen' ? this.width = this.container.width() : this.width = this.opts.size[0];
	}

    Carousel.prototype = {
        display:function(){
			if (this.opts.size === 'fullScreen') {
				$('html,body').css({width:'100%',height:'100%'});
				this.container.css({width:'100%',height:'100%'});
			}else{
				this.container.css({width:this.opts.size[0]+'px',height:this.opts.size[1]+'px'});
			}
			this.item.css({width: this.width}).wrapAll('<div class="carousel-wrap"></div>');
			if (this.opts.horVertical === true) {
				this.item.each(function(){
					$(this).wrapInner('<div class="table"><div class="table-cell"></div></div>');
				});
			}
			if (this.opts.arrow === true) {
				this.container.append('<span class="carousel-arrow carousel-arrow-left">'+this.opts.arrowText[0]+'</span><span class="carousel-arrow carousel-arrow-right">'+this.opts.arrowText[1]+'</span>');
			}
			if (this.opts.dots === true) {
				this.container.append('<div class="carousel-dots"></div>');
				for (var i = 0; i < this.item.length; i++) {
					this.container.find('.carousel-dots').append('<i class="dots"></i>');
				}
				this.container.find('.carousel-dots .dots').eq(this.index).addClass('current');
			}
			this.item.eq(this.index).css({left: 0}).siblings().css({left: -this.width});
        },
        autoPlay:function(self){
            if (this.opts.autoPlay) {
                function auto() {
					self.oldindex = self.index;
					self.index >= self.item.length - 1 ? self.index = 0 : self.index++;
					self.moveRight(self);
                }
                this.timer = setInterval(auto, this.opts.interval);
				this.container.hover(function() {
					console.log(1);
					clearInterval(self.timer);
				},function() {
					self.timer = setInterval(auto, self.opts.interval);
				});
            }    
        },
		resize:function(self){
			$(window).resize(function() {
				self.item.css({
					width: self.container.width()
				});
				self.item.eq(self.index).stop().animate({
					'left': 0
				}).siblings().css({
					left: -self.container.width()
				});
				self.width = self.container.width();
			});
		},		
		callBack:function(){
			if (this.opts.onLeave) {
				this.opts.onLeave(this.oldindex);
			}
			if (this.opts.onEnter) {
				this.opts.onEnter(this.index);
			}
		},
        moveLeft:function(self){
			this.item.eq(this.oldindex).stop(false, true).animate({'left': this.width},500);
			this.item.eq(this.index).css({'left': -this.width}).stop(false, true).animate({'left': 0},500,function(){
				self.callBack();
			});
			self.current(self.index);
        },
        moveRight:function(self){
				this.item.eq(this.oldindex).stop(false, true).animate({'left': -this.width},500).siblings().css({'left': -this.width});
				this.item.eq(this.index).css({'left': this.width}).stop(false, true).animate({'left': 0},500,function(){
					self.callBack();
				});
				self.current(self.index);
        },
        current:function(index){
            this.container.find('.dots').eq(index).addClass('current').siblings().removeClass('current');
        },		
		init:function(){
			var self = this;
			this.display();
			this.resize(self);
			this.autoPlay(self);
			this.container.find('.carousel-arrow-left').bind('click',function() {
				if (!self.item.is(":animated")) {
					self.oldindex = self.index;
					self.index > 0 ? self.index--:self.index = self.item.length - 1
					self.moveLeft(self);
				}
			});
			this.container.find('.carousel-arrow-right').bind('click',function() {
				if (!self.item.is(":animated")) {
					self.oldindex = self.index;
					self.index >= self.item.length - 1 ? self.index = 0 : self.index++;
					self.moveRight(self);
				}
			});
			this.container.find('.dots').bind('mouseover',function() {
				self.oldindex = self.index;
				self.index = $(this).index();
				if (self.index > self.oldindex) {
					self.moveRight(self);
				} else if (self.index < self.oldindex) {
					self.moveLeft(self);
				}
			});
		}
        
    }

	$.fn.helloCarousel = function(opts) {
		var fn = new Carousel(this, opts);
		return fn.init();
	}
})(jQuery, window);
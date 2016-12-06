; (function($) {
	function Scroll(ele, opts) {
		this.defaults = {
			step: 10,
			animate: null,
			duration: 200,
			scrollEnd: function() {
				console.log('end!');
			}
		};
		this.opts = $.extend({},
		this.defaults, opts);
		this.ele = $(ele),
		this.wrap = null;
		this.content = null;
		this.bar = null;
		this.activeTop = 0;
		this.moveStep = 0;
		this.num = 1;
		this.maxTop = 0;
	}
	Scroll.prototype = {
		display: function() {
			this.ele.wrapInner('<div class="hello-scroll-wrap"></div>');
			this.wrap = this.ele.find(".hello-scroll-wrap");
			this.wrap.wrapInner('<div class="hello-scroll-content"></div>');
			this.content = this.ele.find(".hello-scroll-content");
			this.wrap.css({
				'width': this.ele.width(),
				'height': this.ele.height()
			});
			if (this.content.height() > this.wrap.height()) {
				this.wrap.append('<span class="hello-scroll-bar"></span>');
				this.bar = this.ele.find(".hello-scroll-bar");
				this.bar.css({
					'height': $(this.ele).height() * $(this.ele).height() / this.content.height()
				});
			}
			this.maxTop = this.wrap.height() - this.bar.height();
		},
		scroll: function(self) {
			this.bar.on("mousedown",function(e) {
				var $this = $(this),
				mdPos = e.clientY - $(this).offset().top;
				self.ele.on('mousemove',function(e) {
					$(this).addClass('no-select');
					self.activeTop = e.clientY - mdPos - self.wrap.offset().top;
					if (self.activeTop < 0) {
						$this.css({top: 0});
						self.content.css({top: 0});
					} else if (self.activeTop > self.maxTop) {
						$this.css({top: self.maxTop});
						self.content.css({top: -self.maxTop * self.content.height() / $(self.ele).height()});
						self.callBack();
					} else {
						$this.css({top: self.activeTop});
						if (!self.opts.animate) {
							self.content.css({top: -self.activeTop * self.content.height() / $(self.ele).height()});
						} else {
							self.content.stop().animate({top: -self.activeTop * self.content.height() / $(self.ele).height()},self.opts.duration, self.opts.animate);
						}
					}
				});
				self.ele.on('mouseup',function() {
					$(this).off('mousemove').removeClass('no-select');
					self.num = Math.ceil(parseInt(self.bar.css('top')) / self.moveStep);
				});
			});
		},
		mousewheel: function(self) {
			self.moveStep = (self.wrap.height() - self.bar.height()) / self.opts.step;
			this.ele.mousewheel(function(event, delta) {
				if (!self.opts.animate) {
					self.bar.css({
						top: self.num * self.moveStep
					});
					self.content.css({
						top: -self.num * self.moveStep * self.content.height() / $(self.ele).height()
					});
				} else {
					self.bar.stop().animate({
						top: self.num * self.moveStep
					},
					self.opts.duration, self.opts.animate);
					self.content.stop().animate({
						top: -self.num * self.moveStep * self.content.height() / $(self.ele).height()
					},
					self.opts.duration, self.opts.animate);
				}
				if (delta < 0) {
					if (self.num == self.opts.step) {
						self.callBack();
						return;
					}
					self.num++;
				} else {
					if (self.num == 0) {
						return;
					}
					self.num--;
				}
				if (self.num <= self.opts.step && self.num >= 0) {
					event.preventDefault();
				}
			});
		},
		callBack: function() {
			if (this.opts.scrollEnd) {
				this.opts.scrollEnd();
				this.opts.scrollEnd = null;
			}
		},
		init: function() {
			var self = this;
			this.display();
			this.scroll(self);
			this.mousewheel(self);
		}
	}
	$.fn.helloScroll = function(opts) {
		var fn = new Scroll(this, opts);
		return fn.init();
	}
})(jQuery);
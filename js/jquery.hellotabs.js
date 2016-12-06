; (function($, window, document, undefined) {
	function Tabs(ele, opts) {
		this.defaults = {
			triggerName: ['Black', 'Red', 'Yellow', 'White', 'Green'],
			autoPlay: false,
			interval: 1000,
			event: 'mouseover'
		};
		this.opts = $.extend({},
		this.defaults, opts);
		this.ele = ele;
		this.trigger = null;
		this.container = null;
		this.times = 1;
	}

	Tabs.prototype = {
		display: function(self) {
			var dom = '<ul class="hello-tabs-trigger">';
			for (var i = 0; i < this.opts.triggerName.length; i++) {
				dom += '<li>' + this.opts.triggerName[i] + '</li>';
			}
			dom += '</ul>';
			this.ele.prepend(dom);
			this.trigger = this.ele.find('.hello-tabs-trigger');
			this.container = this.ele.find('.hello-tabs-container');
			this.ele.find(this.trigger).children().first().addClass('current');
			this.container.children().first().addClass('current');
			if (this.opts.event != 'mouseover' && this.opts.event != 'click') return;
			this.ele.find(this.trigger).children().bind(this.opts.event,function() {
				var index = $(this).index();
				self.current(index);
			});
			this.ele.hover(function() {
				clearInterval(self.timer);
			},
			function() {
				if (self.opts.autoPlay) {
					var index = self.container.children(":visible").index();
					self.times = index + 1;
					self.autoPlay(self);
				}
			});
		},
		current: function(num) {
			this.ele.find(this.trigger).children().eq(num).addClass('current').siblings().removeClass('current');
			this.container.children().eq(num).addClass('current').siblings().removeClass('current');
		},
		autoPlay: function(self) {
			if (this.opts.autoPlay) {
				function auto() {
					self.current(self.times - 1);
					self.times == self.opts.triggerName.length ? self.times = 1 : self.times++;
				}
				this.timer = setInterval(auto, this.opts.interval);
			}
		},
		init: function() {
			var self = this;
			this.display(self);
			this.autoPlay(self);
		}
	}

	$.fn.helloTabs = function(opts) {
		var fn = new Tabs(this, opts);
		return fn.init();
	}
})(jQuery, window, document);
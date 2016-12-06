; (function($) {
	function Steps(ele, opts) {
		this.defaults = {
			title: ['1.填写用户名', '2.接收邮件', '3.设置新密码', '4.完成', '5.Demo'],
			steps: 2
		};
		this.opts = $.extend({},
		this.defaults, opts);
		this.ele = ele;
	}
	Steps.prototype = {
		display: function() {
			for (var i = 0; i < this.opts.title.length; i++) {
				$(this.ele).append("<div class='item'><span>" + this.opts.title[i] + "</span></div>");
			}
			var width = $(this.ele).width() / this.opts.title.length;
			$(this.ele).find(".item").width(width).eq(this.opts.steps - 1).addClass("current");
		}
	}
	$.fn.helloSteps = function(opts) {
		var fn = new Steps(this, opts);
		return fn.display();
	}
})(jQuery);
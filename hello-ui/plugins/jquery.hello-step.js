; (function($) {
	$.helloPlug.prototype.step = function(param){
		var defaults = {
			title: ['1.填写用户名', '2.接收邮件', '3.设置新密码', '4.完成', '5.Demo'],
			index: 2
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele);
		for (var i = 0; i < opts.title.length; i++) {
			$this.append("<div class='item'><span>" + opts.title[i] + "</span></div>");
		}
		var width = $this.width() / opts.title.length;
		$this.find(".item").width(width).eq(opts.index - 1).addClass("current");
	}
})(jQuery);
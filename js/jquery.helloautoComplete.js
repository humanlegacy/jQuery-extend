; (function($, window, undefined) {
	function Autocomplete(ele, opts) {
		this.defaults = {
			data: [{
				index: 1,
				item: 'white'
			},
			{
				index: 2,
				item: 'balck'
			}],
			autoFocus: true,
			menu: '.demo',
			callBack: function(data) {}
		};
		this.opts = $.extend({},
		this.defaults, opts);
		this.ele = ele,
		this.index,
		this.menu;
	}
	Autocomplete.prototype = {
		init: function() {
			var self = this;
			$("body").append('<div class="hello-autocomplete ' + this.opts.menu.substring(1) + '"><ul class="wrap"></ul></div>');
			for (var i = 0; i < this.opts.data.length; i++) {
				$(this.opts.menu).find(".wrap").append("<li data-index='" + this.opts.data[i].index + "'><span>" + this.opts.data[i].item + "</span></li>");
			}
			this.menu = $(this.opts.menu);
			this.keydown(self);
			this.focus(self);
			this.select(self);
			$(".hello-autocomplete").bind("mouseleave",function() {
				$(this).removeClass("current");
				$(this).find("li").show();
			});
		},
		keydown: function(self) {
			$("html,body").find(this.ele).each(function() {
				$(this).attr("data-index", Math.random()).attr("autocomplete", "off");
				$(this).keyup(function() {
					$(self.opts.menu).find("li").hide();
					var value = $(this).val();
					self.check(value);
				});
			});
		},
		focus: function(self) {
			var thisEvent;
			this.opts.autoFocus ? thisEvent = 'click': thisEvent = 'keyup';
			$(this.ele).bind(thisEvent,function() {
				var value = $(this).val();
				self.show(self, $(this));
				self.check(value);
			});
		},
		check: function(value) {
			if (value.length > 0) {
				$(this.opts.menu).find("li").each(function() {
					var liStr = $(this).find("span").text(),
					LowerCaseliStr = liStr.toLowerCase();
					LowerCaseliStr.indexOf(value.toLowerCase()) > -1 ? $(this).show() : '';
				});
			} else {
				$(this.opts.menu).find("li").show();
			}
		},
		show: function(self, $self) {
			$(this.opts.menu).css({
				width: $self.outerWidth(),
				left: $self.offset().left,
				top: $self.offset().top + $self.outerHeight()
			}).addClass("current");
			this.index = $self.attr("data-index");
			this.check($self.val());
		},
		select: function(self) {
			$(self.opts.menu).on("click", 'li',function() {
				var item = $(this).text(),index = $(this).attr("data-index");
				var data = {
					index: index,
					item: item
				};
				$("html,body").find(self.ele).each(function() {
					if ($(this).attr("data-index") == self.index) {
						$(this).val(item);
						if (self.opts.callBack) {
							self.opts.callBack(data);
						}
					}
				});
			});
		}
	}
	$.fn.helloAutocomplete = function(opts) {
		var action = new Autocomplete(this, opts);
		return action.init();
	}
})(jQuery, window);
; (function($, window, document, undefined) {
	function Select(ele, opts) {
		this.defaults = {
			title: '请选择',
			city: false,
			split: '-',
			data: 'libs/data.json',
			input: '#id'
		};
		this.opts = $.extend({},
		this.defaults, opts);
		this.ele = ele;
	}
	Select.prototype = {
		open: function(self) {
			$(this.ele).on('click', '.select-btn',function() {
				$(this).next().is(":visible") ? $(this).next().removeClass("current") : $(this).next().addClass("current");
			});
		},
		close: function(self) {
			$(this.ele).find(".container").bind("mouseleave",function() {
				$(this).removeClass('current');
			});
		},
		select: function(self) {
			$(this.ele).find(".container").on('click', 'li',function() {
				var selected = $(this).text();
				$(this).parent().parent().find("a").text(selected);
				self.opts.input ? $(self.opts.input).val(selected) : '';
				$(this).removeClass("current");
			});
		},
		common: function(self) {
			this.display(this.opts.title);
			this.open(self);
			this.select(self);
			this.close(self);
		},
		cityOpts: function(optsList) {
			var cityOptsList = '<li>' + optsList + '</li>';
			return cityOptsList;
		},
		city: function(self) {
			var html = '<div class="container container-city">' + '<div class="tabs">' + '<span class="current">省级</span><span>市级</span><span>区级</span>' + '</div>' + '<div class="container-inner"><ul class="current"></ul><ul></ul><ul></ul></div>' + '</div>';
			$(this.ele).html(html);
			var M = $(this.ele).find(".container-inner");
			var M1 = M.find("ul").eq(0);
			var M2 = M.find("ul").eq(1);
			var M3 = M.find("ul").eq(2);
			this.display(this.opts.title);
			this.open(self);
			this.close(self);

			$(this.ele).find(".tabs span").click(function() {
				var index = $(this).index();
				$(this).addClass("current").siblings().removeClass("current");
				$(this).parent().next().find("ul").eq(index).addClass("current").siblings().removeClass("current");
			});
			M.find("ul").on('click', 'li',function() {
				var index = $(this).parent().index() + 1;
				$(this).addClass('current').siblings().removeClass('current');
				$(this).parentsUntil(self.ele).find(".tabs span").eq(index).addClass("current").siblings().removeClass("current");
				$(this).parent().next().addClass("current").siblings().removeClass("current");
				$(this).parent().nextAll().html("");
			});

			$.getJSON(this.opts.data,function(result) {$.each(result[0],function(p1) {
					self.ele.find("ul").eq(0).append(self.cityOpts(p1));
				});

				var M1s, M2s;
				M1.on('click', 'li',function() {
					M1s = $(this).text();
					$.each(result[0],function(p1, p2) {
						if (M1s == p1) {
							$.each(p2,function(p3, p4) {
								M2.append(self.cityOpts(p3));
							});
						}
					});
				});

				M2.on("click", "li",function() {
					M2s = $(this).text();
					$.each(result[0],function(p1, p2) {
						$.each(p2,function(p3, p4) {
							if (M2s == p3) {
								$.each(p4.split(","),function() {
									M3.append(self.cityOpts(this));
								});
							}
						});
					});
				});

				M3.on("click", "li",function() {
					var cityArr = [];
					$(self.ele).find('ul').each(function() {
						$(this).find('li').each(function() {
							$(this).hasClass('current') ? cityArr.push($(this).text()) : '';
						});
					});
					$(this).parentsUntil(self.ele).parent().find('.select-btn').find('a').html(cityArr.join(self.opts.split));
					self.opts.input ? $(self.opts.input).val(cityArr.join(self.opts.split)) : '';
				});
			});
		},
		display: function(type) {
			var html = '<span class="select-btn"><a href="javascript:void(0);">' + type + '</a><i class="arrow"></i></span>';
			$(this.ele).prepend(html);
		},
		init: function(self) {
			var self = this;
			this.opts.city ? this.city(self) : this.common(self);
		}
	}
	$.fn.helloSelect = function(opts) {
		var fn = new Select(this, opts);
		return fn.init();
	}
})(jQuery, window, document);